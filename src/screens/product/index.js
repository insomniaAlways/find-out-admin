import React, { useState } from "react";
import { connect } from "react-redux";
import TableCommon from "../../components/table-helpers/table-common";
import { useHistory } from "react-router-dom";
import { findAllSellerProduct } from "../../store/actions/seller-product.action";
const columns = [
  {
    Header: "Id",
    accessor: "id"
  },
  {
    Header: "Name",
    accessor: "name"
  }
];

function Product(props) {
  const { products, fetchSellerProduct, request } = props;
  let history = useHistory();
  const rowClickHandler = (row) => {
    const { values } = row;
    //const [original] = row;
    history.push("/product-details/" + values.id + "/edit");
  };
  return (
    <div className="ui container">
      <TableCommon
        rowClickHandler={rowClickHandler}
        columns={columns}
        data={products}
        fetchData={fetchSellerProduct}
        isLoading={request.isLoading}
        tableClassName={"ui simple table"}
      />
    </div>
  );
}

const mapStateToProps = () => {
  return (state) => ({
    products: Object.values(state.sellerProduct.data.byId),
    request: state.sellerProduct.request
  });
};

const mapDispatchToProps = (dispatch) => ({
  fetchSellerProduct: (query) => {
    dispatch(findAllSellerProduct({ actions: {} }));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);
