import clsx from "clsx";
import React from "react";

function Count(props) {
  const { title, value, className } = props;

  return (
    <div className="doubling column">
      <div className={clsx("count total-order", className)}>
        <div className="text-size-large">{title}</div>
        <div className="doubling count-value text-center text-vertical-center">{value}</div>
      </div>
    </div>
  );
}

export default Count;
