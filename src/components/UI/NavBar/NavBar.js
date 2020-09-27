import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router";

import Menu from "./Menu/Menu";
import Login from "../../Auth/Login/Login";
import { BtnMedium } from "../Button/Button";
import classes from "./NavBar.module.css";
import * as actions from "../../../store/actions/member";
import { NavLink, useLocation } from "react-router-dom";

import "./NavBar.scss";

const NavBar = () => {
  const location = useLocation();

  const [isLogin, setIsLogin] = useState(false);

  const isAuthenticated = useSelector((state) => state.member.token !== null);

  const dispatch = useDispatch();
  const onLogin = (email, password, rememberMe) => {
    dispatch(actions.login(email, password, rememberMe));
  };

  const isInHomepage = location.pathname === "/";

  const loginClickHandler = () => setIsLogin(true);

  const authCancelHandler = () => {
    setIsLogin(false);
    dispatch(actions.deleteResponse());
  };

  return (
    <>
      <div className={`navbar ${isInHomepage ? "navbar-homepage" : null}`}>
        <NavLink to={"/"} className={classes.Logo}>
          CoffeeShopGuide
        </NavLink>
        {isAuthenticated ? (
          <Menu />
        ) : (
          <BtnMedium clicked={loginClickHandler} btnType="WhiteBorder">
            Login
          </BtnMedium>
        )}
      </div>
      {isLogin ? (
        <Login show={isLogin} close={authCancelHandler} submit={onLogin} />
      ) : null}
    </>
  );
};

export default withRouter(NavBar);
