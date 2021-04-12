import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import category from "../../screens/category";
import DashBoard from "../../screens/dashboard";
import Item from "../../screens/item";
import Navigation from "../../navigations";
import { unAuthenticate, unAuthenticateInitiate } from "../../store/actions/session.action";
import { connect } from "react-redux";

const Navbar = (props) => {
  const { triggerLogout } = props;

  const handleLogout = () => {
    // debugger;
    triggerLogout();
  };

  return (
    <>
      <div className="ui  inverted pointing menu ">
        <Link to="/" className="item" name="dashboard">
          Dashboard
        </Link>
        <Link to="/category" className="item" name="category">
          Category
        </Link>
        <Link to="/item" className="item" name="item">
          Item
        </Link>
        <Link to="/order" className="item" name="order">
          Order
        </Link>
        <div className="right menu">
          <button className="ui item border-no" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    triggerLogout: () => {
      // debugger;
      dispatch(unAuthenticateInitiate());
    }
  };
};
export default connect(null, mapDispatchToProps)(Navbar);
