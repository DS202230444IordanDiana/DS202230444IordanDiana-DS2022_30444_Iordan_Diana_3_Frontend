import React from "react";
import "./commons/styles/main-styles.css";

import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarBrand,
  NavLink,
  UncontrolledDropdown,
} from "reactstrap";

import logo from "./commons/images/icon.png";
import { useHistory } from "react-router-dom";

const userNavbar = ({ logout }) => (
  <>
    <DropdownItem>
      <NavLink href="/user">Devices</NavLink>
    </DropdownItem>
    <DropdownItem>
      <NavLink href="/charts">Charts</NavLink>
    </DropdownItem>
    <DropdownItem onClick={logout}>
      <NavLink>Log out</NavLink>
    </DropdownItem>
  </>
);

const adminNavbar = ({ logout }) => (
  <>
    <DropdownItem>
      <NavLink href="/admin/person">People</NavLink>
    </DropdownItem>
    <DropdownItem>
      <NavLink href="/devices">Devices</NavLink>
    </DropdownItem>
    <DropdownItem onClick={logout}>
      <NavLink>Log out</NavLink>
    </DropdownItem>
  </>
);

const basicNavbar = (
  <>
    <DropdownItem>
      <NavLink href="/">Home</NavLink>
    </DropdownItem>
    <DropdownItem>
      <NavLink href="/login">Login</NavLink>
    </DropdownItem>
  </>
);

function selectDropdownItems(user, logout) {
  if (user) {
    if (user.role === "ADMIN") {
      return adminNavbar((logout = { logout }));
    }
    if (user.role === "USER") {
      return userNavbar((logout = { logout }));
    }
  }
  return basicNavbar;
}

const textStyle = {
  color: "white",
  textDecoration: "none",
};

function NavigationBar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const history = useHistory();

  const logout = () => {
    localStorage.removeItem("user");
    history.push("/");
  };

  return (
    <div>
      <Navbar color="dark" className="navbarClass" light expand="md">
        <NavbarBrand href="/">
          <img src={logo} width={"50"} height={"35"} />
        </NavbarBrand>
        <Nav className="ml-auto mr-3" navbar>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret size="lg">
              Menu
            </DropdownToggle>
            <DropdownMenu right>
              {selectDropdownItems(user, logout)}
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Navbar>
    </div>
  );
}

export default NavigationBar;
