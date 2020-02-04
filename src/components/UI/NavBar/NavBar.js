import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router";

import ProfileLogo from "../Logo/ProfileLogo";
import BubbleBox from "./BubbleBox/BubbleBox";
import Login from "../../Auth/Login/Login";
import { BtnMedium } from "../Button/Button";
import classes from "./NavBar.module.css";
import * as actions from "../../../store/actions/member";
import { NavLink } from "react-router-dom";

const NavBar = props => {
  const [showBubbleBox, setShowBubbleBox] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const isAuthenticated = useSelector(state => state.member.token !== null);
  const dispatch = useDispatch();
  const onLogin = (email, password) => dispatch(actions.login(email, password));
  const clearError = () => dispatch(actions.clearError())

  const inHomepage = props.location.pathname === "/";

  const profileLogoClickedHandler = () => setShowBubbleBox(!showBubbleBox);

  const authCancelHandler = () => {
    setIsLogin(false)
    clearError()
  };

  let bgColor = "#219653";
  let shadow = "0 8px 16px -8px rgba(0,0,0,0.4)";

  if (inHomepage) {
    bgColor = "none";
    shadow = "none";
  }

  return (
    <div className={classes.Toolbar} style={{ boxShadow: shadow }}>
      <nav className={classes.Nav} style={{ background: bgColor }}>
        <NavLink to={"/"} className={classes.Logo}>
          CoffeeShopGuide
        </NavLink>
        <div className={classes.NavList}>
          {inHomepage ? null : (
            <NavLink to={"/"} className={classes.NavLink}>
              Home
            </NavLink>
          )}
          {isAuthenticated ? (
            <React.Fragment>
              <NavLink to={"/search"} className={classes.NavLink}>
                Search
              </NavLink>
              <div className={classes.Vline} />
            </React.Fragment>
          ) : null}
          <div className={classes.NavBtn}>
            {isAuthenticated ? (
              <ProfileLogo clicked={profileLogoClickedHandler} />
            ) : (
              <BtnMedium clicked={() => setIsLogin(true)} btnType="WhiteBorder">
                Login
              </BtnMedium>
            )}
          </div>
        </div>
      </nav>
      {showBubbleBox ? (
        <BubbleBox
          show={profileLogoClickedHandler}
          close={profileLogoClickedHandler}
        />
      ) : null}
      {isLogin ? (
        <Login
          show={isLogin}
          close={authCancelHandler}
          header={"Login"}
          submit={onLogin}
        />
      ) : null}
    </div>
  );
};

export default withRouter(NavBar);
