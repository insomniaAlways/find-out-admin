import React from "react";
import { Link } from "react-router-dom";
import { unAuthenticateInitiate } from "../../store/actions/session.action";
import { connect } from "react-redux";

const Navbar = (props) => {
  const { triggerLogout } = props;

  const handleLogout = () => {
    triggerLogout();
  };

  return (
    <div className="ui inverted pointing menu margin-no border-radius-none">
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
      <div className="right menu">
        <button className="ui item border-no" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
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
