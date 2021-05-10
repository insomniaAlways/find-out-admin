import React from "react";
import moment from "moment";

function ListView(props) {
  return (
    <div class="ui raised segments">
      <div class="ui segment cursor-pointer">
        <p>{`${moment().format("YYYY")}${moment().format("MM")}${moment().format(
          "DD"
        )}${moment().format("hh")}${moment().format("mm")}${moment().format("ss")}`}</p>
      </div>
      <div class="ui segment cursor-pointer">
        <p>{`${moment().format("YYYY")}${moment().format("MM")}${moment().format(
          "DD"
        )}${moment().format("hh")}${moment().format("mm")}${moment().format("ss")}`}</p>
      </div>
      <div class="ui segment cursor-pointer">
        <p>{`${moment().format("YYYY")}${moment().format("MM")}${moment().format(
          "DD"
        )}${moment().format("hh")}${moment().format("mm")}${moment().format("ss")}`}</p>
      </div>
    </div>
  );
}

export default ListView;
