import React from "react";
import profileLogo from "../../../assets/logo/user.png";

const ProfileLogo = props => (
  <button onClick={props.clicked}>
    <img src={profileLogo} alt={"Profile"} />
  </button>
);

export default ProfileLogo;
