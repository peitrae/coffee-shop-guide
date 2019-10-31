import React from "react";

import { BtnMedium } from "../../../components/UI/Button/Button";
import classes from "./Profile.module.css";

const profile = props => (
  <div className={classes.Profile}>
    <div className={classes.DivEdit}>
      <button className={classes.TextGray} onClick={props.editProfileClicked}>Edit Profile</button>
      <button className={classes.TextGray} onClick={props.editPasswordClicked}>Edit Password</button>
    </div>
    <div className={classes.DivProfile}>
      <span className={classes.Name}>Deny Andrianto</span>
      <span className={classes.TextGray}>denyandrianto@gmail.com</span>
    </div>
    <div className={classes.BtnBeOwner}>
      <BtnMedium btnName="Ajukan sebagai owner" btnType="Green"/>
    </div>
  </div>
);

export default profile;

