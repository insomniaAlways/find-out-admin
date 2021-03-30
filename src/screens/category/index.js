import React from "react";
import { connect } from "react-redux";
import TableCommon from "../../components/table-helpers/table-common";
import { findAllCategory } from "../../store/actions/category.action";

const columns = [
  {
    Header: "Id",
    accessor: "id"
    // headerClassName: "text-color-white text-size-sixteen padding-xl-left",
    // cellClassNames: "padding-lg-left cursor-pointer text-wrap text-weight-medium"
  },
  {
    Header: "Name",
    accessor: "name"
    //headerClassName: "text-color-white text-size-sixteen padding-xl-left",
    //cellClassNames: "padding-lg-left cursor-pointer text-wrap text-weight-medium"
  }
];
function Category(props) {
  const { categories, fetchCategory, request } = props;
  console.log(categories);
  return (
    <div className="ui container">
      <TableCommon
        columns={columns}
        data={categories}
        fetchData={fetchCategory}
        isLoading={request.isLoading}
        tableClassName="ui celled table"
      />
    </div>
  );
}

const mapStateToProps = () => {
  return (state) => ({
    categories: Object.values(state.category.data.byId),
    request: state.category.request
  });
};

const mapDispatchToProps = (dispatch) => ({
  fetchCategory: (query) => dispatch(findAllCategory({ actions: {} }))
});

export default connect(mapStateToProps, mapDispatchToProps)(Category);
