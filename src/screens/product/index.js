import React, { useState } from "react";
import { connect } from "react-redux";
import TableCommon from "../../components/table-helpers/table-common";
import { useHistory } from "react-router-dom";
import { findAllSellerProduct } from "../../store/actions/seller-product.action";
import { getListData } from "../../store/selectors/data.selector";
const columns = [
  {
    Header: "Id",
    accessor: "id"
  },
  {
    Header: "Name",
    accessor: "name"
  },
  {
    Header: "Unit",
    accessor: "unit"
  }
];

function Product(props) {
  const { products, fetchSellerProduct, request } = props;
  const history = useHistory();

  const rowClickHandler = (row) => {
    const { original } = row;
    history.push("/product/" + original.id + "/details");
  };

  console.log(products);

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
  const getData = getListData();
  return (state) => ({
    products: getData(state, "sellerProduct"),
    request: state.sellerProduct.request
  });
};

const mapDispatchToProps = (dispatch) => ({
  fetchSellerProduct: (query) => {
    dispatch(findAllSellerProduct({ actions: {} }));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);
