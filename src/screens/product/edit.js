import React from "react";
import { findByIdProduct } from "../../store/actions/product.action";
import { useParams } from "react-router";
import { connect } from "react-redux";

const ProductEdit = () => {
  const params = useParams();
  debugger;
  return (
    <>
      <div>{params.product_id}</div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchProduct: (id) => {
    dispatch(findByIdProduct({ actions: {} }));
  }
});

export default connect(null, mapDispatchToProps)(ProductEdit);
