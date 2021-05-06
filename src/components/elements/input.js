import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

const getString = (value = "") => {
  return (value || "").toString().trim();
};

const Input = ({ field, ...props }) => {
  const {
    isDisabled,
    type,
    name,
    placeholder,
    value,
    shouldTrim,
    setValue,
    min,
    className,
    inputClassName
  } = props;

  const handleChange = (e) => {
    if (shouldTrim) {
      setValue(name, getString(e.target.value));
    } else {
      setValue(name, e.target.value);
    }
  };

  return (
    <div className={clsx("ui input", { disabled: isDisabled }, className)}>
      <input
        name={name}
        className={clsx("text-color-black", inputClassName)}
        type={type || "text"}
        onChange={handleChange}
        value={value}
        min={min}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;

Input.propTypes = {
  isDisabled: PropTypes.bool,
  type: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  shouldTrim: PropTypes.bool,
  setValue: PropTypes.func,
  min: PropTypes.string,
  className: PropTypes.string,
  inputClassName: PropTypes.string
};
