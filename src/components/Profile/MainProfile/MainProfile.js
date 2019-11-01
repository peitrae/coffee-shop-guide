import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router";

import { BtnMedium, BtnSmall } from "../../UI/Button/Button";
import classes from "./MainProfile.module.css";
import * as actions from "../../../store/actions/member";

const MainProfile = props => {
  const {
    editProfileClicked,
    editPasswordClicked,
    showVerificationHandler
  } = props;

  const getUserData = useSelector(state => state.member);
  const dispatch = useDispatch();
  const toBeOwner = () => dispatch(actions.sendVerification());

  const { name, email, emailSent, emailVerified } = getUserData;

  const toBeOwnerHandler = () => {
    toBeOwner();
    showVerificationHandler()
  };

  const addCoffeeShop = () => props.history.push("/addCoffeeShop");

  let mainButton = null;
  if (emailVerified) {
    mainButton = (
      <BtnMedium
        btnName="Add Coffee Shop"
        btnType="Green"
        clicked={addCoffeeShop}
      />
    ); // Change clicked to edit/add page
  } else if (emailSent && !emailVerified) {
    mainButton = (
      <BtnMedium
        btnName="Verification"
        btnType="Green"
        clicked={emailSent ? showVerificationHandler : toBeOwnerHandler()}
      />
    );
  }

  return (
    <div className={classes.Profile}>
      <div className={classes.DivEdit}>
        <BtnSmall
          className={classes.BtnSmall}
          btnName={"Edit Profile"}
          clicked={editProfileClicked}
        />
        <BtnSmall
          className={classes.BtnSmall}
          btnName={"Edit Password"}
          clicked={editPasswordClicked}
        />
      </div>
      <div className={classes.DivProfile}>
        <span className={classes.Name}>{name}</span>
        <span className={classes.TextGray}>{email}</span>
      </div>
      <div className={classes.BtnBeOwner}>{mainButton}</div>
    </div>
  );
};

export default withRouter(MainProfile);
