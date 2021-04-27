import React from "react";
import { connect } from "react-redux";
import ProductForm from "../../components/product-helpers/product-form";
import { createSellerProduct } from "../../store/actions/seller-product.action";

function ProductCreate(props) {
  const { create } = props;
  return <ProductForm onSave={create} />;
}

const mapDispatchToProps = (dispatch) => ({
  create: ({ payload, actions }) => dispatch(createSellerProduct({ payload, actions }))
});

export default connect(null, mapDispatchToProps)(ProductCreate);
