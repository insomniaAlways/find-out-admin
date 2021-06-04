import React, { Fragment } from "react";
import Count from "../../components/dashboard-helpers/count";
import ListView from "../../components/dashboard-helpers/list-view";

const Dashboard = () => {
  return (
    <>
      <div className="ui equal width stackable grid">
        <Count title={"Completed Orders"} value={188} />
        <Count title={"In progress Orders"} value={12} />
        <Count title={"Pending Orders"} value={15} />
        <Count title={"Canceled Orders"} value={36} />
      </div>
      <div className="ui equal width stackable grid">
        <Count title={"Low stock packets"} value={10} className="low-stock" />
        <Count title={"Empty stock"} value={12} className="red text-color-white" />
      </div>
      <div className="ui equal width stackable grid">
        <div className="row">
          <div className="doubling six wide column">Recent Activities:</div>
        </div>
        <div className="row">
          <div className="doubling column">
            {/* <div className="ui horizontal segments"> */}{" "}
            <div className="ui raised segment">
              <div className="text-large">Pending Orders:</div>
              <ListView />
            </div>
          </div>
          <div className="doubling column">
            <div className="ui raised segment">
              <div className="text-large">In-progress Orders:</div>
              <ListView />
            </div>
          </div>
          {/* </div> */}
          <div className="doubling column">
            <div className="ui raised segment">
              <div className="text-large">Completed Orders:</div>
              <ListView />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
