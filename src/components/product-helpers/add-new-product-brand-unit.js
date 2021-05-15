import clsx from "clsx";
import React, { useReducer, useState } from "react";
import Dropdown from "../elements/dropdown";
import units from "../../utils/units";
import SellerProductDetail from "./seller-product-detail";
import Barcode from "./barcode";

function reducer(state, action) {
  switch (action.type) {
    case "reset":
      return {
        product_brand_unit: null,
        mrp_price: "",
        price: "",
        quantity: "",
        barcode: ""
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
  const { onSave, productBrand, product, toggleModal } = props;
  const [state, dispatch] = useReducer(reducer, {
    product_brand_unit: null,
    mrp_price: "",
    price: "",
    quantity: "",
    barcode: ""
  });
  const [isSubmitting, toggleSubmit] = useState(false);
  const [isSearching, toggleSearching] = useState(false);
  const [disablePreFillSection, togglePreFillSection] = useState(false);

  const [errors, updateError] = useState({
    product_brand_unit: null,
    mrp_price: null,
    price: null,
    quantity: null
  });

  const { product_brand_unit, mrp_price, price, quantity, barcode } = state;

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
    units[product.unit].push({
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
          unit_value: state.product_brand_unit.value,
          mrp_price: parseFloat(state.mrp_price),
          price: parseFloat(state.price),
          quantity: parseFloat(state.quantity),
          barcode: parseFloat(state.barcode)
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
      <Barcode
        isSubmitting={isSubmitting}
        toggleSearching={toggleSearching}
        isSearching={isSearching}
        togglePreFillSection={togglePreFillSection}
        dispatch={dispatch}
      />
      <hr />
      <div className="two fields">
        <div className="field">
          <label>Select Packet Unit</label>
          <Dropdown
            elementKey={productBrand && productBrand.id}
            isDisabled={
              !(productBrand && productBrand.id) ||
              isSubmitting ||
              isSearching ||
              disablePreFillSection
            }
            listSource={product ? units[product.unit] : []}
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
        <SellerProductDetail
          label={"MRP"}
          handleInputChange={handleInputChange}
          value={mrp_price}
          placeholder={"Enter here"}
          error={errors.mrp_price}
          state={state}
          name={"mrp_price"}
          isSubmitting={isSubmitting}
          isSearching={isSearching}
        />
      </div>
      <div className="three fields">
        <SellerProductDetail
          label={"Selling Price"}
          handleInputChange={handleInputChange}
          value={price}
          placeholder={"Enter here"}
          error={errors.price}
          state={state}
          name={"price"}
          isSubmitting={isSubmitting}
          isSearching={isSearching}
        />
        <SellerProductDetail
          label={"Currently Available Quantity"}
          handleInputChange={handleInputChange}
          value={quantity}
          placeholder={"Enter here"}
          error={errors.quantity}
          state={state}
          name={"quantity"}
          isSubmitting={isSubmitting}
          isSearching={isSearching}
        />
        <SellerProductDetail
          label={"Enter barcode if Available"}
          handleInputChange={handleInputChange}
          value={barcode}
          placeholder={"Enter barcode"}
          error={errors.barcode}
          state={state}
          name={"barcode"}
          isSubmitting={isSubmitting}
          isSearching={isSearching}
        />
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
