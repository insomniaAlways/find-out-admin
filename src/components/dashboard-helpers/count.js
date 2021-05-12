import clsx from "clsx";
import React from "react";

function Count(props) {
  const { title, value, className } = props;

  return (
    <div className="column">
      <div className={clsx("count total-order", className)}>
        <div>{title}</div>
        <p className="count-value text-center">{value}</p>
      </div>
    </div>
  );
}

export default Count;
