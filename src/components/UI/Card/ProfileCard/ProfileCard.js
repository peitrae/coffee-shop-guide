import React, { useState } from "react";
import { useSelector } from "react-redux";

import classes from "./ProfileCard.module.css";
import Card from "../Card";

const ProfileCard = props => (
  <Card cardType={classes.ProfileCard}>
    <div className={classes.GreenDiv}>{props.image}</div>
    <div>
      <div className={classes.Section}>{props.children}</div>
    </div>
  </Card>
);

export default ProfileCard;
