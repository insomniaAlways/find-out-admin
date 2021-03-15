import React from "react";
import { Image, Button } from "semantic-ui-react";

const TableErrorHelper = (props) => {
  const { refreshHandler } = props;
  return (
    <tr>
      <td id="table-error" colSpan={props.colSpan} className="border-none">
        <Image src="/assets/images/warning.svg" size="tiny" centered />
        <div className="text-center width-full padding-sm-top">Error Loading Data</div>
        <div className="text-center">
          <Button className="margin-top-ten" primary onClick={refreshHandler}>
            Refresh
          </Button>
        </div>
      </td>
    </tr>
  );
};
export default TableErrorHelper;
