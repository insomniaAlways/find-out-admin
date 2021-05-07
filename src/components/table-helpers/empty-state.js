import React from "react";

const TableEmptyState = (props) => {
  return (
    <tr>
      <td id="table-empty" colSpan={props.colSpan} className="border-none">
        <div className="text-center width-full padding-sm-top">No data found</div>
      </td>
    </tr>
  );
};
export default TableEmptyState;
