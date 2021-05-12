import React, { Fragment } from "react";
import Count from "../../components/dashboard-helpers/count";
import ListView from "../../components/dashboard-helpers/list-view";

function DashBoard() {
  return (
    <Fragment>
      <div className="ui equal width stackable grid margin-no">
        <Count title={"Completed Orders"} value={188} />
        <Count title={"In progress Orders"} value={12} />
        <Count title={"Pending Orders"} value={15} />
        <Count title={"Canceled Orders"} value={36} />
      </div>
      <div className="ui equal width stackable grid margin-no">
        <Count title={"Low stock packets"} value={10} className="low-stock" />
        <Count title={"Empty stock"} value={12} className="red text-color-white" />
      </div>
      <div className="ui segments bg-transparent border-none box-shadow-none">
        <div className="ui segment bg-transparent border-none box-shadow-none text-weight-medium">
          Recent Activities:
        </div>
        <div className="ui horizontal segments bg-white recent-activity-container">
          <div className="ui segment">
            <p>Pending Orders: </p>
            <ListView />
          </div>
          <div className="ui segment">
            <p>In progress orders: </p>
            <ListView />
          </div>
          <div className="ui segment">
            <p>Completed Orders: </p>
            <ListView />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default DashBoard;
