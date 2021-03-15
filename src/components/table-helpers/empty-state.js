import React from "react";
import { Image } from "semantic-ui-react";

const TableEmptyState = (props) => {
  return (
    <tr>
      <td id="table-empty" colSpan={props.colSpan} className="border-none">
        <Image src="/assets/images/mailbox.svg" size="tiny" centered />
        <div className="text-center width-full padding-sm-top">No data found</div>
      </td>
    </tr>
  );
};
export default TableEmptyState;
