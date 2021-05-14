import clsx from "clsx";
import React, { useReducer, useState } from "react";
import { createRecord } from "../../store/server";
import AsyncDropdown from "../elements/async-dropdown";
import Dropdown from "../elements/dropdown";
import units from "../../utils/units";
import Barcode from "./barcode";
import SellerProductDetail from "./seller-product-detail";

function reducer(state, action) {
  switch (action.type) {
    case "reset":
      return {
        product: null,
        product_brand: null,
        product_brand_unit: null,
        mrp_price: "",
        price: "",
        quantity: ""
      };
    case "product":
      return {
        ...state,
        [action.type]: action.value,
        product_brand: null,
        product_brand_unit: null,
        mrp_price: "",
        price: "",
        quantity: ""
      };
    case "product_brand":
      return {
        ...state,
        [action.type]: action.value,
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
    case "pre-fill":
      return {
        ...state,
        ...action.value
      };
    default:
      return { ...state, [action.type]: action.value };
  }
}
function ProductForm(props) {
  const { onSave } = props;
  const [state, dispatch] = useReducer(reducer, props.initialValue);
  const [isSubmitting, toggleSubmit] = useState(false);
  const [disablePreFillSection, togglePreFillSection] = useState(false);
  const [isSearching, toggleSearching] = useState(false);

  const [errors, updateError] = useState({
    product: null,
    product_brand: null,
    product_brand_unit: null,
    mrp_price: null,
    price: null,
    quantity: null,
    barcode: ""
  });

  const { product, product_brand, product_brand_unit, mrp_price, price, quantity, barcode } = state;

  const handleInputChange = (name, value) => {
    dispatch({ type: name, value });
  };

  const handleDropdownChange = (name, value = {}) => {
    dispatch({ type: name, value });
  };

  const validated = () => {
    const e = {
      product: null,
      product_brand: null,
      product_brand_unit: null,
      mrp_price: null,
      price: null,
      quantity: null
    };
    if (!product) {
      e.product = "Required";
    }
    if (!product_brand) {
      e.product_brand = "Required";
    }
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

  const handleCreate = (inputValue, key, path, actions) => {
    const payload = {};
    if (path === "product-brand-unit") {
      payload.product_brand_id = product_brand.id;
      payload.unit_value = inputValue;
    }
    if (path === "product-brand") {
      payload.brand_name = inputValue;
      payload.product_id = product.id;
    }
    return createRecord(path, payload).then((res) => {
      product.product_brands.push(res.data);
      dispatch({
        type: "product_brand",
        value: res.data
      });
    });
  };

  const productBrandHandleCreate = (inputValue) => {
    const payload = {
      brand_name: inputValue,
      product_id: state.product.id
    };
    return createRecord("product-brand", payload, {
      baseURL: "https://findoutv1.herokuapp.com/public/v1"
    }).then((res) => {
      product.product_brands.push(res.data);
      dispatch({
        type: "product_brand",
        value: res.data
      });
    });
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
          product_brand_id: state.product_brand.id,
          unit_value: state.product_brand_unit.value,
          // product_brand_unit_id: state.product_brand_unit.id,
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
      <div className="field">
        <label>Select Product</label>
        <AsyncDropdown
          remotePath={"product"}
          optionLabel={"name"}
          isDisabled={isSubmitting || isSearching || disablePreFillSection}
          axiosConfig={{
            baseURL: "https://findoutv1.herokuapp.com/public/v1"
          }}
          isSearchEnabled={true}
          setSelectedOption={(value) => handleDropdownChange("product", value)}
          selectedOption={product}
          placeholder={"Select product"}
          onCreateOption={(value) => handleCreate(value, "name", "product")}
        />
        {errors.product && <span className="text-color-negative">{errors.product}</span>}
      </div>
      <div className="field">
        <label>Select Brand</label>
        <Dropdown
          optionLabel={"brand_name"}
          isDisabled={
            !(product && product.id) || isSubmitting || isSearching || disablePreFillSection
          }
          listSource={product ? product.product_brands : []}
          isSearchEnabled={true}
          setSelectedOption={(value) => handleDropdownChange("product_brand", value)}
          selectedOption={product_brand}
          placeholder={"Select brand"}
          onCreateOption={productBrandHandleCreate}
        />
        {errors.product_brand && (
          <span className="text-color-negative">{errors.product_brand}</span>
        )}
      </div>
      <div className="two fields">
        <div className="field">
          <label>Select Packet Unit</label>
          <Dropdown
            elementKey={product_brand && product_brand.id}
            isDisabled={
              !(product && product.id && product_brand && product_brand.id) ||
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
          Add Product
        </div>
      </div>
    </div>
  );
}

export default ProductForm;
