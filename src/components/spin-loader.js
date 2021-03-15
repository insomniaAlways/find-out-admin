import React from "react";

const SpinLoader = ({ className = "" }) => (
  <div className={`ui ${className} grid margin-no height-full`}>
    <div className="middle aligned column">
      <div className="ui active inline loader"></div>
    </div>
  </div>
);

export default SpinLoader;
