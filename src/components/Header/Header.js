import React, { useContext } from "react";
import cart from "../../assets/img/carts.svg";
import { Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./Header.css";
import { userContext } from "../../App";

const Header = () => {
  const [loggedUser] = useContext(userContext);

  return (
    <header>
      <Navbar expand="lg">
        <NavLink to="/" className="navbar-brand">
          <img src={cart} alt="" />
          KENA KATA
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto align-items-center">
            <NavLink exact to="/" className="nav-link">
              Home
            </NavLink>
            <NavLink to="/orders" className="nav-link">
              Orders
            </NavLink>
            <NavLink to="/deals" className="nav-link">
              Deals
            </NavLink>
            <NavLink to="/login" className="btn btn-sm main-btn mr-2">
              {!loggedUser.email ? "Login" : "Account"}
            </NavLink>
            <NavLink to="/dashboard" className="btn btn-sm btn-dark">
              Admin
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
