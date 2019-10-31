import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import ProfileLogo from "../Logo/ProfileLogo";
import BubbleBox from "./BubbleBox/BubbleBox";
import Login from "../../Auth/Login/Login";
import { BtnMedium } from "../Button/Button";
import classes from "./NavBar.module.css";
import * as actions from "../../../store/actions/member";

const NavBar = props => {
  const [showBubbleBox, setShowBubbleBox] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const { isAuthenticated, onLogin } = props;

  const profileLogoClickedHandler = () => {
    showBubbleBox ? setShowBubbleBox(false) : setShowBubbleBox(true);
  };

  const authCancelHandler = () => {
    setIsLogin(false);
  };

  let bgColor = "#219653";
  let shadow = "0 8px 16px -8px rgba(0,0,0,0.4)";

  if (props.location.pathname === "/" ) {
    bgColor = "none"
    shadow = "none"
  }
  
  return (
    <div className={classes.Toolbar} style={{boxShadow: shadow}}>
      <header className={classes.Header} style={{ background: bgColor }}>
        <div className={classes.NavButton}>
          {isAuthenticated ? (
            <ProfileLogo clicked={profileLogoClickedHandler} />
          ) : (
            <BtnMedium
              btnName="Login"
              clicked={() => setIsLogin(true)}
              btnType="WhiteBorder"
            />
          )}
        </div>
      </header>
      {showBubbleBox && (
        <BubbleBox
          show={profileLogoClickedHandler}
          close={profileLogoClickedHandler}
        />
      )}
      {isLogin && (
        <Login
          show={isLogin}
          close={authCancelHandler}
          header={"Login"}
          submit={onLogin}
        />
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.member.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (email, password) => dispatch(actions.login(email, password))
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar));
