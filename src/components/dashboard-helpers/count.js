import React from "react";

function Count(props) {
  const { title, value } = props;

  return (
    <div className="column">
      <div className="count total-order">
        <div>{title}</div>
        <p className="count-value text-center">{value}</p>
      </div>
    </div>
  );
}

export default Count;
