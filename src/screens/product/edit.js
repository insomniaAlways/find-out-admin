import React, { useEffect } from "react";
import { useParams } from "react-router";
import { connect } from "react-redux";
import { findByIdSellerProduct } from "../../store/actions/seller-product.action";
import { getDataById } from "../../store/selectors/find-data.selector";

const ProductEdit = (props) => {
  const { fetchSellerProduct } = props;
  const { seller_product_id } = useParams();

  useEffect(() => {
    if (seller_product_id) {
      fetchSellerProduct(seller_product_id);
    }
  }, [fetchSellerProduct, seller_product_id]);

  return (
    <>
      <div>{seller_product_id}</div>
    </>
  );
};

const mapStateToProps = () => {
  const getData = getDataById();
  return (state, { match }) => ({
    sellerProduct: getData(state, "sellerProduct", match.params.seller_product_id),
    request: state.sellerProduct.request
  });
};

const mapDispatchToProps = (dispatch) => ({
  fetchSellerProduct: (seller_product_id) => {
    dispatch(findByIdSellerProduct({ seller_product_id, actions: {} }));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductEdit);
