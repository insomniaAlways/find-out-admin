import React, { useMemo } from "react";
import { connect } from "react-redux";
import ProductForm from "../../components/product-helpers/product-form";
import { createSellerProduct } from "../../store/actions/seller-product.action";

function ProductCreate(props) {
  const initialValue = useMemo(
    () => ({
      product: null,
      product_brand: null,
      product_brand_unit: null,
      mrp_price: "",
      seller_price: "",
      quantity: ""
    }),
    []
  );
  const { create } = props;
  return <ProductForm onSave={create} initialValue={initialValue} />;
}

const mapDispatchToProps = (dispatch) => ({
  create: ({ payload, actions }) => dispatch(createSellerProduct({ payload, actions }))
});

export default connect(null, mapDispatchToProps)(ProductCreate);
