import React from "react";

import classes from "./ProfileCard.module.css";
import Card from "../Card";

const ProfileCard = props => (
  <Card className={classes.ProfileCard} shadow>
    <div className={classes.GreenDiv}>{props.image}</div>
    <div>
      <div className={classes.Section}>{props.children}</div>
    </div>
  </Card>
);

export default ProfileCard;
