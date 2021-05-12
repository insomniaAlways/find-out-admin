import React from "react";
// import { useHistory, useParams } from "react-router";
// import { connect } from "react-redux";
// import TableCommon from "../../components/table-helpers/table-common";
// import { Button } from "semantic-ui-react";
// import { getListData } from "../../store/selectors/data.selector";

// const columns = [
//   {
//     Header: "Order No.",
//     accessor: "brand_name",
//     headerClassName: "text-color-white"
//   },
//   {
//     Header: "Items",
//     accessor: "items",
//   },
//   {
//     Header: "Order placed on",
//     accessor: "created_at",
//   },
//   {
//     Header: "Order Type",
//     accessor: "delivery_type",
//   },
//   {
//     Header: "Order Status",
//     accessor: "status"
//   },
//   {
//     Header: "Payment Status",
//     accessor: "payment_status"
//   }
// ];

const Order = (props) => {
  // const { seller_product_id } = useParams();
  // const [openModal, toggleModal] = useState(false);
  // const { push } = useHistory();

  // const rowClickHandler = ({ original }) => {
  //   if (original.id) {
  //     // push("product-brand/" + original.id + "/details");
  //   }
  // };

  return (
    <div className="ui segments">
      <div className="ui segment padding-no">
        <div className="ui stackable two column grid margin-no">
          <div className="middle aligned column">
            <h3>Orders</h3>
          </div>
        </div>
      </div>
      <div className="ui segment table-container">
        {/* <TableCommon
            rowClickHandler={rowClickHandler}
            columns={columns}
            isLoading={request.isLoading}
            data={productBrands}
            containerClassNames={"height-full"}
            tableClassName={"ui simple table"}
            fetchData={fetchProductBrand}
            defaultQuery={{ product_id: sellerProduct.id }}
          /> */}
      </div>
    </div>
  );
};

// const mapStateToProps = () => {
//   const getData = getDataById();
//   const getAllData = getListData();
//   return (state, { match }) => ({
//     sellerProduct: getData(state, "sellerProduct", match.params.seller_product_id),
//     productBrands: getAllData(state, "productBrand"),
//     request: state.productBrand.request
//   });
// };

// const mapDispatchToProps = (dispatch) => ({
// });

export default Order;
