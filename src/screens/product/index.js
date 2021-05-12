import React from "react";
import { connect } from "react-redux";
import TableCommon from "../../components/table-helpers/table-common";
import { useHistory } from "react-router-dom";
import { getListData } from "../../store/selectors/data.selector";
import Button from "../../components/elements/button";
import DeleteView from "../../components/product-helpers/delete-view";
import { deleteProduct, findAllProduct } from "../../store/actions/product.action";

const columns = [
  {
    Header: "Name",
    accessor: "name",
    width: "90%",
    headerClassName: "text-color-white"
  },
  {
    Header: "",
    accessor: "id",
    headerClassName: "border-none",
    triggerDelete: deleteProduct,
    item_key: "product_id",
    Cell: DeleteView
  }
];

function Product(props) {
  const { products, fetchProduct, request } = props;

  const history = useHistory();

  const rowClickHandler = (row) => {
    const { original } = row;
    history.push("/product/" + original.id + "/details");
  };

  const createNew = () => {
    history.push("/product/create");
  };

  return (
    <div className="ui segments">
      <div className="ui segment">
        <Button
          label={"Add new product"}
          onClick={createNew}
          isPositive={true}
          className={"tiny"}
        />
      </div>
      <div className="ui segment table-container">
        <TableCommon
          rowClickHandler={rowClickHandler}
          columns={columns}
          data={products}
          fetchData={fetchProduct}
          isLoading={request.isLoading}
          containerClassNames={"height-full"}
          tableClassName={"ui simple table"}
        />
      </div>
    </div>
  );
}

const mapStateToProps = () => {
  const getData = getListData();
  return (state) => ({
    products: getData(state, "product"),
    request: state.product.request
  });
};

const mapDispatchToProps = (dispatch) => ({
  fetchProduct: (query) => {
    dispatch(findAllProduct({ actions: {} }));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);
