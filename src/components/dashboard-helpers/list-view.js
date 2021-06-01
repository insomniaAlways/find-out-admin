import React from "react";
import moment from "moment";

function ListView(props) {
  return (
    <div className="doubling ui raised segments">
      <div className=" doubling ui segment cursor-pointer">
        <p>{`${moment().format("YYYY")}${moment().format("MM")}${moment().format(
          "DD"
        )}${moment().format("hh")}${moment().format("mm")}${moment().format("ss")}`}</p>
      </div>
      <div className=" doubling ui segment cursor-pointer">
        <p>{`${moment().format("YYYY")}${moment().format("MM")}${moment().format(
          "DD"
        )}${moment().format("hh")}${moment().format("mm")}${moment().format("ss")}`}</p>
      </div>
      <div className="doubling ui segment cursor-pointer">
        <p>{`${moment().format("YYYY")}${moment().format("MM")}${moment().format(
          "DD"
        )}${moment().format("hh")}${moment().format("mm")}${moment().format("ss")}`}</p>
      </div>
    </div>
  );
}

export default ListView;
