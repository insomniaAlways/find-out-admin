import React, { useState } from "react";
import { Link } from "react-router-dom";
import category from "../../screens/category";
import DashBoard from "../../screens/dashboard";
import Item from "../../screens/item";
import Navigation from "../../navigations";

const Navbar = () => {
  const [activeItem, setactiveItem] = useState("");
  const handleclick = (e, arg) => console.log(e);

  return (
    <>
      <div className="ui  inverted pointing menu ">
        <Link
          to="/"
          className="item"
          name="dashboard"
          onClick={handleclick}
          active={activeItem === "dashboard"}>
          Dashboard
        </Link>
        <Link
          to="/category"
          className="item"
          name="category"
          active={activeItem === "category"}
          onClick={handleclick}>
          Category
        </Link>
        <Link
          to="/item"
          className="item"
          name="item"
          active={activeItem === "item"}
          onClick={handleclick}>
          Item
        </Link>
        <Link
          to="/order"
          className="item"
          name="order"
          active={activeItem === "order"}
          onClick={handleclick}>
          Order
        </Link>
        <div class="right menu">
          <a class="ui item">Logout</a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
