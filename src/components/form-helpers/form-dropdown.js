import React, { memo, useMemo, useRef } from "react";
import Dropdown from "../elements/dropdown";
import { Form } from "semantic-ui-react";
import clsx from "clsx";
import { ErrorMessage, useField } from "formik";
import PropTypes from "prop-types";

const FormDropdown = memo((props) => {
  const { field, isSubmitting } = props;
  const { placeholder, width, inputClassNames, valuePath, infoPlaceholder } = field;
  const [formikField, meta] = useField({ name: valuePath });
  const listSource = useRef([]);

  const hasError = useMemo(() => meta.error && meta.touched, [meta.error, meta.touched]);

  const value = useMemo(() => formikField.value, [formikField.value]);

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
        isSearchEnabled={true}
        setSelectedOption={onChange}
        listSource={listSource.current}
        handleBlur={onHandleBlur}
        isRemote={false}
        selectedOption={value}
        name={valuePath}
        placeholder={placeholder}
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
});

export default FormDropdown;

FormDropdown.propTypes = {
  field: PropTypes.object,
  isSubmitting: PropTypes.bool
};
