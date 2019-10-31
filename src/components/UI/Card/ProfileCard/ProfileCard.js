import React from "react";

import classes from "./ProfileCard.module.css";
import Card from "../Card";

const profileCard = props => (
  <React.Fragment>
    <div className={classes.GreenSection}></div>
    <Card cardType={classes.ProfileCard}>
      <img
        src={props.profilePict}
        alt="Profile Picture"
        className={classes.ImgProfile}
      />
      <div className={classes.Section}>{props.children}</div>
    </Card>
  </React.Fragment>
);

export default profileCard;
