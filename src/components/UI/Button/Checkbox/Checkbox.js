import React from 'react';

import classes from "./Checkbox.module.css";

const Checkbox = props => (
    <label className={classes.Container}>
    <input
      type="checkbox"
      name={props.inputId}
      className={classes.CheckboxInput}
      value={props.labelChild}
      onChange={props.changed}
      onClick={props.clicked}
      checked={props.checked}
    />
    <div className={classes.Checkmark}>
      <div>{props.labelChild}</div>
    </div>
  </label>
)

export default Checkbox;