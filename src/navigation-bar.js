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
      <NavLink href="/user/notifications">Notifications</NavLink>
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

const textStyle = {
  color: "white",
  textDecoration: "none",
};

function NavigationBar({ user }) {
  const history = useHistory();

  const logout = () => {
    localStorage.removeItem("user");
    history.push("/");
  };

  function selectDropdownItems(user, logout) {
    if (user) {
      if (user.role === "ADMIN") {
        return adminNavbar((logout = { logout }));
      }
      if (user.role === "USER") {
        return userNavbar((logout = { logout }));
      }
    }
  }
  return (
    <div>
      {user ? (
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
      ) : (
        <></>
      )}
    </div>
  );
}

export default NavigationBar;
