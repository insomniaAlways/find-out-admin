import clsx from "clsx";
import React, { useReducer, useState } from "react";
import Dropdown from "../elements/dropdown";
import Input from "../elements/input";
import units from "../../utils/units";

function reducer(state, action) {
  switch (action.type) {
    case "reset":
      return {
        product_brand_unit: null,
        mrp_price: "",
        price: "",
        quantity: ""
      };

    case "product_brand_unit":
      return {
        ...state,
        [action.type]: action.value,
        mrp_price: "",
        price: "",
        quantity: ""
      };
    default:
      return { ...state, [action.type]: action.value };
  }
}

function AddNewProductBrandUnit(props) {
  const { onSave, productBrand, sellerProduct, toggleModal } = props;
  const [state, dispatch] = useReducer(reducer, {
    product_brand_unit: null,
    mrp_price: null,
    price: null,
    quantity: null
  });
  const [isSubmitting, toggleSubmit] = useState(false);

  const [errors, updateError] = useState({
    product_brand_unit: null,
    mrp_price: null,
    price: null,
    quantity: null
  });

  const { product_brand_unit, mrp_price, price, quantity } = state;

  const handleInputChange = (name, value) => {
    dispatch({ type: name, value });
  };

  const handleDropdownChange = (name, value = {}) => {
    dispatch({ type: name, value });
  };

  const validated = () => {
    const e = {
      product_brand_unit: null,
      mrp_price: null,
      price: null,
      quantity: null
    };
    if (!mrp_price) {
      e.mrp_price = "Required";
    }
    if (!product_brand_unit) {
      e.product_brand_unit = "Required";
    }
    if (!price) {
      e.price = "Required";
    }
    if (!quantity) {
      e.quantity = "Required";
    }
    updateError((prev) => ({
      ...prev,
      ...e
    }));
    return e;
  };

  const pbuHandleCreate = (inputValue) => {
    units[sellerProduct.unit].push({
      label: inputValue,
      value: inputValue
    });
    dispatch({
      type: "product_brand_unit",
      value: {
        label: inputValue,
        value: inputValue
      }
    });
  };

  const onSuccess = () => {
    toggleSubmit(false);
    dispatch({ type: "reset" });
  };
  const onFailed = () => {
    toggleSubmit(false);
  };

  const save = () => {
    const hasError = validated();
    if (!Object.values(hasError).filter((d) => d).length) {
      toggleSubmit(true);
      onSave({
        payload: {
          product_brand_id: productBrand.id,
          unit: state.product_brand_unit.value,
          mrp_price: state.mrp_price,
          price: state.price,
          quantity: state.quantity
        },
        actions: {
          onSuccess,
          onFailed
        }
      });
    }
  };

  const resetAndClose = () => {
    toggleModal(false);
    toggleSubmit(false);
    dispatch({ type: "reset" });
  };

  return (
    <div className="ui form">
      <div className="two fields">
        <div className="field">
          <label>Select Packet Unit</label>
          <Dropdown
            elementKey={productBrand && productBrand.id}
            isDisabled={!(productBrand && productBrand.id) || isSubmitting}
            listSource={sellerProduct ? units[sellerProduct.unit] : []}
            isSearchEnabled={true}
            setSelectedOption={(value) => handleDropdownChange("product_brand_unit", value)}
            selectedOption={product_brand_unit}
            placeholder={"Select Packet Unit"}
            onCreateOption={pbuHandleCreate}
          />
          {errors.product_brand_unit && (
            <span className="text-color-negative">{errors.product_brand_unit}</span>
          )}
        </div>
        <div className="field">
          <label>MRP</label>
          <Input
            name={"mrp_price"}
            className="text-color-black"
            type={"number"}
            setValue={handleInputChange}
            min="1"
            value={mrp_price}
            isDisabled={
              !(
                productBrand &&
                productBrand.id &&
                product_brand_unit &&
                product_brand_unit.value
              ) || isSubmitting
            }
            placeholder={"Enter here"}
          />
          {errors.mrp_price && <span className="text-color-negative">{errors.mrp_price}</span>}
        </div>
      </div>
      <div className="two fields">
        <div className="field">
          <label>Selling Price</label>
          <Input
            name={"price"}
            className="text-color-black"
            type={"number"}
            setValue={handleInputChange}
            min="1"
            value={price}
            isDisabled={
              !(
                productBrand &&
                productBrand.id &&
                product_brand_unit &&
                product_brand_unit.value
              ) || isSubmitting
            }
            placeholder={"Enter here"}
          />
          {errors.price && <span className="text-color-negative">{errors.price}</span>}
        </div>
        <div className="field">
          <label>Currently Available Quantity</label>
          <Input
            name={"quantity"}
            className="text-color-black"
            type={"number"}
            setValue={handleInputChange}
            min="1"
            value={quantity}
            isDisabled={
              !(
                productBrand &&
                productBrand.id &&
                product_brand_unit &&
                product_brand_unit.value
              ) || isSubmitting
            }
            placeholder={"Enter here"}
          />
          {errors.quantity && <span className="text-color-negative">{errors.quantity}</span>}
        </div>
      </div>
      <div className={clsx("field text-center", { disabled: isSubmitting })}>
        <div className="ui positive button" onClick={save}>
          Add Packet
        </div>
        <div className="ui negative button" onClick={resetAndClose}>
          Cancel
        </div>
      </div>
    </div>
  );
}

export default AddNewProductBrandUnit;
