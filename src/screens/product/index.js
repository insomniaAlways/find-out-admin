import React from "react";
import { connect } from "react-redux";
import TableCommon from "../../components/table-helpers/table-common";
import { useHistory } from "react-router-dom";
import { findAllSellerProduct } from "../../store/actions/seller-product.action";
import { getListData } from "../../store/selectors/data.selector";
import Button from "../../components/elements/button";

const columns = [
  {
    Header: "Name",
    accessor: "name",
    headerClassName: "text-color-white"
  }
];

function Product(props) {
  const { products, fetchSellerProduct, request } = props;
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
      <div className="ui segment">
        <TableCommon
          rowClickHandler={rowClickHandler}
          columns={columns}
          data={products}
          fetchData={fetchSellerProduct}
          isLoading={request.isLoading}
          tableClassName={"ui simple table"}
        />
      </div>
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
