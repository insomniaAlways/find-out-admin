import React from "react";
import moment from "moment";

function ListView(props) {
  return (
    <div className="ui raised segments">
      <div className="ui segment cursor-pointer">
        <p>{`${moment().format("YYYY")}${moment().format("MM")}${moment().format(
          "DD"
        )}${moment().format("hh")}${moment().format("mm")}${moment().format("ss")}`}</p>
      </div>
      <div className="ui segment cursor-pointer">
        <p>{`${moment().format("YYYY")}${moment().format("MM")}${moment().format(
          "DD"
        )}${moment().format("hh")}${moment().format("mm")}${moment().format("ss")}`}</p>
      </div>
      <div className="ui segment cursor-pointer">
        <p>{`${moment().format("YYYY")}${moment().format("MM")}${moment().format(
          "DD"
        )}${moment().format("hh")}${moment().format("mm")}${moment().format("ss")}`}</p>
      </div>
    </div>
  );
}

export default ListView;
