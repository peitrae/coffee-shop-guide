import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { BtnMedium } from "../../UI/Button/Button";
import classes from "./MainProfile.module.css";
import * as actions from "../../../store/actions/member";

const MainProfile = props => {

  const { name, email, photoURL, emailSent, emailVerified } = props.getUserData;
  const { editProfileClicked, editPasswordClicked, toBeOwner } = props;

  const toBeOwnerHandler = () => {
    toBeOwner();
    props.history.push("/verificationOwner");
  };

  const checkStatusHandler = () => {
    props.history.push("/verificationOwner");
  };

  let mainButton = null;
  if (emailVerified) {
    mainButton = (
      <BtnMedium
        btnName="Add Coffee Shop"
        btnType="Green"
        clicked={checkStatusHandler} 
      />
    ); // Change clicked to edit/add page
    } 
  else if (emailSent && !emailVerified) {
    mainButton = (
      <BtnMedium
        btnName="Check Status"
        btnType="Green"
        clicked={checkStatusHandler}
      />
    );
  } else {
    mainButton = (
      <BtnMedium
        btnName="Verification"
        btnType="Green"
        clicked={toBeOwnerHandler}
      />
    )
  }

  const addCoffeeShop = () => {
    props.history.push("/addCoffeeShop")
  }

  return (
    <div className={classes.Profile}>
      <div className={classes.DivEdit}>
        <button className={classes.TextGray} onClick={editProfileClicked}>
          Edit Profile
        </button>
        <button className={classes.TextGray} onClick={editPasswordClicked}>
          Edit Password
        </button>
      </div>
      <div className={classes.DivProfile}>
        <span className={classes.Name}>{name}</span>
        <span className={classes.TextGray}>{email}</span>
      </div>
      <div className={classes.BtnBeOwner}>{mainButton}</div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    getUserData: state.member
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toBeOwner: () => dispatch(actions.sendVerification())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MainProfile)
);
