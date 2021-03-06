import React from "react";
import { connect } from "react-redux";
import TableCommon from "../../components/table-helpers/table-common";
import { findAllCategory } from "../../store/actions/category.action";

const columns = [
  {
    Header: "Name",
    accessor: "name",
    headerClassName: "text-color-white"
  }
];

function Category(props) {
  const { categories, fetchCategory, request } = props;

  return (
    <div className="ui segment table-container">
      <TableCommon
        columns={columns}
        data={categories}
        fetchData={fetchCategory}
        isLoading={request.isLoading}
        containerClassNames={"height-full"}
        tableClassName={"ui simple table"}
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
  fetchCategory: (query) => {
    dispatch(findAllCategory({ actions: {} }));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Category);
