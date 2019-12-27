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

  const { name, email, emailVerified } = getUserData;

  const toBeOwnerHandler = () => {
    toBeOwner();
    showVerificationHandler();
  };

  const addCoffeeShop = () => props.history.push("/update-coffee-shop");

  let mainButton = null;
  if (emailVerified) {
    mainButton = (
      <BtnMedium btnType="Green" clicked={addCoffeeShop}>
        Add Coffee Shop
      </BtnMedium>
    ); // Change clicked to edit/add page
  } else if (!emailVerified) {
    mainButton = (
      <BtnMedium btnType="Green" clicked={() => toBeOwnerHandler()}>
        Verification
      </BtnMedium>
    );
  }

  return (
    <div className={classes.Profile}>
      <div className={classes.DivEdit}>
        <BtnSmall className={classes.BtnSmall} clicked={editProfileClicked}>
          Edit Profile
        </BtnSmall>
        <BtnSmall className={classes.BtnSmall} clicked={editPasswordClicked}>
          Edit Password
        </BtnSmall>
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
