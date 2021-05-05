import React, { useReducer } from "react";
import AsyncDropdown from "../elements/async-dropdown";
import Dropdown from "../elements/dropdown";
import Input from "../elements/input";

function reducer(state, action) {
  switch (action.type) {
    case "product":
      return {
        ...state,
        [action.type]: action.value,
        product_brand: null,
        product_brand_unit: null,
        mrp_price: "",
        seller_price: "",
        quantity: ""
      };
    case "product_brand":
      return {
        ...state,
        [action.type]: action.value,
        product_brand_unit: null,
        mrp_price: "",
        seller_price: "",
        quantity: ""
      };
    case "product_brand_unit":
      return {
        ...state,
        [action.type]: action.value,
        mrp_price: "",
        seller_price: "",
        quantity: ""
      };
    default:
      return { ...state, [action.type]: action.value };
  }
}
function ProductForm() {
  const [state, dispatch] = useReducer(reducer, {
    product: null,
    product_brand: null,
    product_brand_unit: null,
    mrp_price: "",
    seller_price: "",
    quantity: ""
  });

  const { product, product_brand, product_brand_unit, mrp_price, seller_price, quantity } = state;

  const handleInputChange = (name, value) => {
    dispatch({ type: name, value });
  };

  const handleDropdownChange = (name, value = {}) => {
    dispatch({ type: name, value });
  };

  return (
    <div className="ui form">
      <div className="field">
        <label>Select Product</label>
        <AsyncDropdown
          remotePath={"product"}
          optionLabel={"name"}
          axiosConfig={{
            baseURL: "https://findoutv1.herokuapp.com/api/v1"
          }}
          isSearchEnabled={true}
          setSelectedOption={(value) => handleDropdownChange("product", value)}
          selectedOption={product}
          placeholder={"Select product"}
        />
      </div>
      <div className="field">
        <label>Select Brand</label>
        <Dropdown
          optionLabel={"brand_name"}
          isDisabled={!(product && product.id)}
          listSource={product ? product.product_brands : []}
          isSearchEnabled={true}
          setSelectedOption={(value) => handleDropdownChange("product_brand", value)}
          selectedOption={product_brand}
          placeholder={"Select brand"}
        />
      </div>
      <div className="field">
        <label>Select Packet Unit</label>
        <AsyncDropdown
          elementKey={product_brand && product_brand.id}
          isDisabled={!(product && product.id && product_brand && product_brand.id)}
          remotePath={"product-brand-unit"}
          optionLabel={"unit_quantity"}
          axiosConfig={{
            baseURL: "https://findoutv1.herokuapp.com/api/v1"
          }}
          isSearchEnabled={true}
          setSelectedOption={(value) => handleDropdownChange("product_brand_unit", value)}
          selectedOption={product_brand_unit}
          placeholder={"Select Packet Unit"}
          query={{ product_brand_id: product_brand && product_brand.id }}
        />
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
              product &&
              product.id &&
              product_brand &&
              product_brand.id &&
              product_brand_unit &&
              product_brand_unit.id
            )
          }
          placeholder={"Enter here"}
        />
      </div>
      <div className="field">
        <label>Selling Price</label>
        <Input
          name={"seller_price"}
          className="text-color-black"
          type={"number"}
          setValue={handleInputChange}
          min="1"
          value={seller_price}
          isDisabled={
            !(
              product &&
              product.id &&
              product_brand &&
              product_brand.id &&
              product_brand_unit &&
              product_brand_unit.id
            )
          }
          placeholder={"Enter here"}
        />
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
              product &&
              product.id &&
              product_brand &&
              product_brand.id &&
              product_brand_unit &&
              product_brand_unit.id
            )
          }
          placeholder={"Enter here"}
        />
      </div>
    </div>
  );
}

export default ProductForm;
