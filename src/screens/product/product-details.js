import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { connect } from "react-redux";
import { findByIdSellerProduct } from "../../store/actions/seller-product.action";
import { getDataById } from "../../store/selectors/find-data.selector";
import TableCommon from "../../components/table-helpers/table-common";

const columns = [
  {
    Header: "Brand Product",
    accessor: "brand_name",
    headerClassName: "text-color-white"
  }
];

const ProductDetails = (props) => {
  const { fetchSellerProduct, sellerProduct = {} } = props;
  const { seller_product_id } = useParams();
  const { push } = useHistory();

  const rowClickHandler = ({ original }) => {
    if (original.id) {
      push("product-brand/" + original.id + "/details");
    }
  };

  useEffect(() => {
    if (seller_product_id) {
      fetchSellerProduct(seller_product_id);
    }
  }, [fetchSellerProduct, seller_product_id]);

  if (sellerProduct && Object.keys(sellerProduct) && sellerProduct.id) {
    return (
      <div className="ui segments">
        <div className="ui segment">
          <h3>{sellerProduct.name}</h3>
          <div>Sub Category: {sellerProduct.sub_category_id}</div>
        </div>
        {sellerProduct && sellerProduct.product_brands.length ? (
          <div className="ui segment">
            <TableCommon
              rowClickHandler={rowClickHandler}
              columns={columns}
              data={sellerProduct.product_brands}
              tableClassName={"ui simple table"}
            />
          </div>
        ) : (
          <div className="ui segment">No item found</div>
        )}
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
