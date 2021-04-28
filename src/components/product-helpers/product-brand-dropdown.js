import React, { useMemo } from "react";
import { Form } from "semantic-ui-react";
import clsx from "clsx";
import { ErrorMessage, useField, useFormikContext } from "formik";
import PropTypes from "prop-types";
import Dropdown from "../elements/dropdown";

function ProductBrandDropdown(props) {
  const { field, isSubmitting } = props;
  const { placeholder, width, inputClassNames, valuePath, infoPlaceholder } = field;
  const [formikField, meta] = useField({ name: valuePath });
  const {
    values: { product },
    setFieldValue
  } = useFormikContext();
  console.log(props, formikField, meta, product);
  const hasError = useMemo(() => meta.error && meta.touched, [meta.error, meta.touched]);

  const value = useMemo(() => formikField.value, [formikField.value]);

  const listSource = useMemo(
    () => (product && product.product_brands ? product.product_brands : []),
    [product]
  );

  const onChange = (data, e) => {
    e.target.name = valuePath;
    e.target.value = data;
    formikField.onChange(e);
  };

  const onHandleBlur = (e) => {
    e.target.name = valuePath;
    formikField.onBlur(e);
  };
  return (
    <Form.Field
      width={width}
      className={clsx("text-color-black", inputClassNames, { error: hasError })}
      disabled={isSubmitting}
      key={valuePath}>
      <Dropdown
        key={"dropdown"}
        listSource={listSource}
        isSearchEnabled={true}
        setSelectedOption={onChange}
        handleBlur={onHandleBlur}
        selectedOption={value}
        name={valuePath}
        placeholder={placeholder}
        {...field}
      />
      <div className="info placeholder text-size-ten text-color-semilightgrey">
        {hasError ? (
          <span className="text-color-negative">
            <ErrorMessage name={valuePath} />
          </span>
        ) : (
          <span>{infoPlaceholder}</span>
        )}
      </div>
    </Form.Field>
  );
}

export default ProductBrandDropdown;
