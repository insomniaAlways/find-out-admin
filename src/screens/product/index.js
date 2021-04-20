import React from "react";
import { connect } from "react-redux";
import TableCommon from "../../components/table-helpers/table-common";
import { findAllProduct } from "../../store/actions/product.action";

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
  const { products, fetchProduct, request } = props;
  // console.log(categories);

  return (
    <div className="ui container">
      <TableCommon
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
