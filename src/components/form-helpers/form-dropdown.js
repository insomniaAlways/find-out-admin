import React, { memo, useMemo } from "react";
import AsyncDropdown from "../elements/async-dropdown";
import { Form } from "semantic-ui-react";
import clsx from "clsx";
import { ErrorMessage, useField } from "formik";
import PropTypes from "prop-types";
import Dropdown from "../elements/dropdown";

const FormDropdown = memo((props) => {
  const { field, isSubmitting } = props;
  const { placeholder, width, inputClassNames, valuePath, infoPlaceholder, isRemote } = field;
  const [formikField, meta] = useField({ name: valuePath });

  const hasError = useMemo(() => meta.error && meta.touched, [meta.error, meta.touched]);

  const value = useMemo(() => formikField.value, [formikField.value]);

  const onChange = (data, e) => {
    const ev = {
      ...e,
      target: {
        name: valuePath,
        value: data
      }
    };
    formikField.onChange(ev);
  };

  const onHandleBlur = (e) => {
    const ev = {
      ...e,
      target: {
        name: valuePath
      }
    };
    formikField.onBlur(ev);
  };
  return (
    <Form.Field
      width={width}
      className={clsx("text-color-black", inputClassNames, { error: hasError })}
      disabled={isSubmitting}
      key={valuePath}>
      {isRemote ? (
        <AsyncDropdown
          key={"dropdown"}
          isSearchEnabled={true}
          setSelectedOption={onChange}
          handleBlur={onHandleBlur}
          selectedOption={value}
          name={valuePath}
          placeholder={placeholder}
          {...field}
        />
      ) : (
        <Dropdown
          key={"dropdown"}
          isSearchEnabled={true}
          setSelectedOption={onChange}
          handleBlur={onHandleBlur}
          selectedOption={value}
          name={valuePath}
          placeholder={placeholder}
          {...field}
        />
      )}
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
