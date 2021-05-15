import React, { useMemo } from "react";
import Input from "../elements/input";
import PropTypes from "prop-types";

function SellerProductDetail(props) {
  const {
    label,
    handleInputChange,
    value,
    placeholder,
    error,
    state,
    isSubmitting,
    isFormDisabled,
    name
  } = props;
  const isDisabled = useMemo(() => {
    const { product_brand_unit } = state;
    return !(product_brand_unit && product_brand_unit.value) || isSubmitting || isFormDisabled;
  }, [state, isSubmitting, isFormDisabled]);

  return (
    <div className="field">
      <label>{label}</label>
      <Input
        name={name}
        className="text-color-black"
        type={"number"}
        setValue={handleInputChange}
        min="1"
        value={value}
        isDisabled={isDisabled}
        placeholder={placeholder || "Enter here"}
      />
      {error && <span className="text-color-negative">{error}</span>}
    </div>
  );
}

export default SellerProductDetail;

SellerProductDetail.propTypes = {
  label: PropTypes.string,
  handleInputChange: PropTypes.func.isRequired,
  value: PropTypes.any,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
  state: PropTypes.object.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  isFormDisabled: PropTypes.bool
};
