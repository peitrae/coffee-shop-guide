import React, { useState, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";

import User from "./User/User";
import UserMenu from "./UserMenu/UserMenu";

import "./Menu.scss";

const Menu = () => {
  const location = useLocation();
  const userRef = useRef();

  const [showUserMenu, setShowUserMenu] = useState(false);

  const userClickedHandler = () => setShowUserMenu(!showUserMenu);

  const menuClickOutsideHandler = (e) => {
    if(e && userRef.current.contains(e.target)) {
      return;
    }

    setShowUserMenu(!showUserMenu);
  }

  const isInHomepage = location.pathname === "/";

  return (
    <div className="navbar-menu">
      {isInHomepage ? null : (
        <NavLink to={"/"} className="navbar-menu-link">
          Home
        </NavLink>
      )}
      <NavLink to={"/search"} className="navbar-menu-link">
        Search
      </NavLink>
      <div className="navbar-menu-separator" />
      <div className="navbar-menu-profile">
        <User ref={userRef} onClick={userClickedHandler}/>
        {showUserMenu ? <UserMenu closeHandler={menuClickOutsideHandler} /> : null}
      </div>
    </div>
  );
};

export default Menu;
