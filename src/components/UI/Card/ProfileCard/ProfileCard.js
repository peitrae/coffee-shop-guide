import React, { useState } from "react";
import { useSelector } from "react-redux";

import classes from "./ProfileCard.module.css";
import Card from "../Card";
import ProfileImg from "../../../../assets/logo/defaultProfile.png";

const ProfileCard = props => {

  const profPict = useSelector(state => state.member.photoURL);

  return (
    <Card cardType={classes.ProfileCard}>
      <div className={classes.GreenDiv}>
        <img
          src={profPict || ProfileImg}
          alt="Profile"
          className={classes.ImgProfile}
        />
      </div>
      <div>
        <div className={classes.Section}>
          {props.children}
        </div>
      </div>
    </Card>
  );
};

export default ProfileCard;
