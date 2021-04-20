import React, { useState } from "react";
import { connect } from "react-redux";
import TableCommon from "../../components/table-helpers/table-common";
import { findAllProduct } from "../../store/actions/product.action";
import { useHistory } from "react-router-dom";
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

function OnRowClick() {}

function Product(props) {
  const { products, fetchProduct, request } = props;
  // console.log(categories);

  let history = useHistory();
  const rowClickHandler = (row) => {
    debugger;
    const { values } = row;
    history.push("/product-details/" + values.id + "/edit");
  };
  return (
    <div className="ui container">
      <TableCommon
        rowClickHandler={rowClickHandler}
        columns={columns}
        data={products}
        fetchData={fetchProduct}
        isLoading={request.isLoading}
        tableClassName={"ui simple table"}
      />
    </div>
  );
}

const mapStateToProps = () => {
  return (state) => ({
    products: Object.values(state.product.data.byId),
    request: state.product.request
  });
};

const mapDispatchToProps = (dispatch) => ({
  fetchProduct: (query) => {
    dispatch(findAllProduct({ actions: {} }));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);
