import React from 'react';

import classes from "./Checkbox.module.css";

const Checkbox = props => (
    <label className={classes.Container}>
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
)

export default Checkbox;