import React from "react";
import { connect } from "react-redux";
import TableCommon from "../../components/table-helpers/table-common";
import { findAllItem } from "../../store/actions/item.action";

const columns = [
  {
    Header: "Id",
    accessor: "id",
    headerClassName: "text-color-white"
  },
  {
    Header: "Name",
    accessor: "name",
    headerClassName: "text-color-white"
  }
];
function Item(props) {
  const { items, fetchItem, request } = props;
  console.log(items);

  return (
    <TableCommon
      columns={columns}
      data={items}
      fetchData={fetchItem}
      isLoading={request.isLoading}
      tableClassName={"ui simple table"}
    />
  );
}

const mapStateToProps = () => {
  return (state) => ({
    items: Object.values(state.item.data.byId),
    request: state.item.request
  });
};

const mapDispatchToProps = (dispatch) => ({
  fetchItem: (query) => {
    dispatch(findAllItem({ actions: {} }));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Item);
