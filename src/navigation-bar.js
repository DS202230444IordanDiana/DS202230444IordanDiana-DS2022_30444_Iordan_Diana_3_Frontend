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

const userNavbar = (
  <DropdownItem>
    <NavLink href="/person">asasd</NavLink>
  </DropdownItem>
);

const adminNavbar = (
  <>
    <DropdownItem>
      <NavLink href="/person">People</NavLink>
    </DropdownItem>
    <DropdownItem>
      <NavLink href="/devices">Devices</NavLink>
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

function selectDropdownItems(user) {
  if (user) {
    if (user.role === "admin") {
      return adminNavbar;
    }
    if (user.role === "user") {
      return userNavbar;
    }
  }
  return basicNavbar;
}
const textStyle = {
  color: "white",
  textDecoration: "none",
};

function NavigationBar({ user }) {
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
            <DropdownMenu right>{selectDropdownItems(user)}</DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Navbar>
    </div>
  );
}

export default NavigationBar;
