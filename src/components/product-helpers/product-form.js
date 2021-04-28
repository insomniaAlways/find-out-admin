import React, { useMemo } from "react";
import Form from "../form-helpers/base";
import Input from "../form-helpers/input";
import { requiredCheck } from "../../utils/validations";
import FormDropdown from "../form-helpers/form-dropdown";
import ProductBrandDropdown from "./product-brand-dropdown";

function ProductForm(props) {
  const { onSave } = props;

  const initialValues = useMemo(
    () => ({
      product: null,
      product_brand: null,
      mrp_price: 0,
      quantity: 0
    }),
    []
  );

  const save = (data) => {
    console.log(data);
    if (onSave) {
      onSave({ payload: data });
    }
  };

  return (
    <div className="ui segment">
      <Form
        fields={fields}
        submitButtonLabel={"Save"}
        initialValues={initialValues}
        postRequest={save}
      />
    </div>
  );
}

export default ProductForm;

const fields = [
  {
    type: "dropdown",
    initialValue: { product: "" },
    valuePath: "product",
    label: "Select Product",
    isRequired: true,
    placeholder: "Search here..",
    Component: FormDropdown,
    isRemote: true,
    width: 10,
    remotePath: "product",
    axiosConfig: {
      baseURL: "https://findoutv1.herokuapp.com/api/v1"
    },
    optionLabel: "name",
    validate: (values) => {
      let error = requiredCheck(values, "product");
      return error;
    }
  },
  {
    type: "dropdown",
    initialValue: { product_brand: "" },
    valuePath: "product_brand",
    label: "Select Product Brand",
    isRequired: true,
    placeholder: "Search here..",
    Component: ProductBrandDropdown,
    isRemote: true,
    width: 10,
    remotePath: "product-brand",
    optionLabel: "brand_name",
    validate: (values) => {
      let error = requiredCheck(values, "product_brand");
      return error;
    }
  },
  {
    type: "number",
    initialValue: { mrp_price: "" },
    valuePath: "mrp_price",
    label: "MRP",
    isRequired: true,
    placeholder: "Enter Here",
    Component: Input,
    width: 10,
    validate: (values) => {
      let error = requiredCheck(values, "mrp_price");
      return error;
    }
  },
  {
    type: "number",
    initialValue: { quantity: "" },
    valuePath: "quantity",
    label: "quantity",
    isRequired: true,
    placeholder: "Enter here",
    Component: Input,
    width: 10,
    validate: (values) => {
      let error = requiredCheck(values, "quantity");
      return error;
    }
  }
];
