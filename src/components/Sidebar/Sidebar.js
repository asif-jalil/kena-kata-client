import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./Sidebar.css";
import cart from "../../assets/img/carts.svg";
import { useState } from "react";
import { Nav, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [sidebarActive, setSidebarActive] = useState(false);

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  return (
    <div className={`sidebar bg-white py-4 ${sidebarActive ? "active" : ""}`}>
      <Button onClick={toggleSidebar} className="sidebar-toggle d-block d-xl-none" variant="warning">
        {sidebarActive ? <FontAwesomeIcon icon={["fas", "times"]} /> : <FontAwesomeIcon icon={["fas", "bars"]} />}
      </Button>
      <NavLink exact to="/" className="navbar-brand mx-auto d-block mb-5 text-center">
        <img src={cart} alt="" /> KENA KATA
      </NavLink>
      <Nav className="flex-column px-4">
        <NavLink exact to="/dashboard" className="nav-link">
          <FontAwesomeIcon icon={["fas", "home"]} /> Dashboard
        </NavLink>
        <NavLink to="/dashboard/manageProduct" className="nav-link">
          <FontAwesomeIcon icon={["fas", "cog"]} /> Manage Product
        </NavLink>
        <NavLink to="/dashboard/addProduct" className="nav-link">
          <FontAwesomeIcon icon={["fas", "plus"]} /> Add Product
        </NavLink>
      </Nav>
    </div>
  );
};

export default Sidebar;
