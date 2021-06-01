import React from "react";
import { Link } from "react-router-dom";
import { unAuthenticateInitiate } from "../../store/actions/session.action";
import { connect } from "react-redux";
import { useState } from "react";
import MobileNav from "./mobile-navbar";

const Navbar = (props) => {
  const { triggerLogout } = props;
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    triggerLogout();
  };
  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="ui inverted pointing menu margin-no border-radius-none ">
        <div className="desktop-menu menu">
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
        <div className="item mobile-menu-icon">
          <i className={isMenuOpen ? "close icon" : "bars icon"} onClick={handleMenuToggle}></i>
          {setMenuOpen(!isMenuOpen)}
        </div>
        <div className="right menu">
          <button className="ui item border-no " onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
      {isMenuOpen ? <MobileNav /> : <></>}
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    triggerLogout: () => {
      dispatch(unAuthenticateInitiate());
    }
  };
};
export default connect(null, mapDispatchToProps)(Navbar);
