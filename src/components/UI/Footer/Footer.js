import React from "react";
import { withRouter } from "react-router";

import classes from "./Footer.module.css";

const Footer = props =>
  props.location.pathname === "/" ? null : (
    <div className={classes.Footer}></div>
  );

export default withRouter(Footer);
