import React from "react";
import profileLogo from "../../../assets/logo/user.png";
import classes from "./ProfileLogo.module.css";

const ProfileLogo = props => (
  <button onClick={props.clicked} className={classes.BtnProfile}>
    <img src={profileLogo} alt={"Profile"} />
  </button>
);

export default ProfileLogo;
