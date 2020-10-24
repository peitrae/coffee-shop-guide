import React, { forwardRef } from "react";

import classes from "./Checkbox.module.css";

const Checkbox = forwardRef((props, ref) => (
  <label className={classes.Container} ref={ref}>
    <input
      type="checkbox"
      name={props.inputId}
      className={classes.CheckboxInput}
      value={props.label}
      onChange={props.changed}
      checked={props.checked}
    />
    <div className={classes.Checkmark}>
      <div>{props.label}</div>
    </div>
  </label>
));

export default Checkbox;
