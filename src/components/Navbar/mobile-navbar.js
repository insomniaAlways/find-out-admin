import React from "react";
import { Link } from "react-router-dom";
import { unAuthenticateInitiate } from "../../store/actions/session.action";
import { connect } from "react-redux";
import { useState } from "react";

const MobileNav = () => {
  return (
    <>
      <div className="ui inverted vertical menu mobile-menu margin-no border-radius-none">
        <Link to="/" className="item" name="dashboard">
          Dashboard
        </Link>
        <Link to="/category" className="item" name="category">
          Category
        </Link>
        <Link to="/product" className="item" name="item">
          Product
        </Link>
        <Link to="/order" className="item" name="order">
          Order
        </Link>
      </div>
    </>
  );
};
export default MobileNav;
