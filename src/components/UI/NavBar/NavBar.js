import React from "react";

import classes from "./NavBar.module.css";
import ProfileLogo from "../Logo/ProfileLogo";
import { GET_AUTH_TOKEN } from "../../../shared/utility";
import { BtnMedium } from "../Button/Button";
import * as actions from "../../../store/actions/index";

const NavBar = props => {

  const loginClickedHandler = event => {
    event.preventDefault();
  }

  let button = <BtnMedium btnName="Masuk" clicked={null} btnType="WhiteBorder"/>;
  let bgColor = "none";
  if (GET_AUTH_TOKEN) {
    button = <ProfileLogo />;
  }

  return (
    <header className={classes.Header}  style={{background: bgColor}}>
      <div className={classes.NavButton}>{button}</div>
    </header>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (name, phoneNumber, email, password, isSignup) =>
      dispatch(actions.auth(name, phoneNumber, email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
    onLogin: () => dispatch(actions.login())
  };
};


export default NavBar;
