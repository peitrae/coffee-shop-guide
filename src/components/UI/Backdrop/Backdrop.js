import React from "react";

import classes from "./Backdrop.module.css";

const backdrop = props =>
  props.show ? (
    <div
      className={[classes.Backdrop, classes[props.backdropType]].join(" ")}
      onClick={props.close}
    ></div>
  ) : null;

export default backdrop;
