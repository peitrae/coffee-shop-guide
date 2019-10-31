import React from "react";

import classes from "./RadioButton.module.css";

const RadioButton = props => {

const radioButton = [classes.Container, classes[props.radioButtonType]].join(" ");

return (
  <label className={radioButton}>
    <input
      type="radio"
      name={props.inputId}
      className={classes.RadioInput}
      value={props.value}
      readOnly
      onClick={props.clicked}
      checked={props.checked}
    />
    <div className={classes.Checkmark}>
      <div>{props.label}</div>
    </div>
  </label>
);

};

export default RadioButton;
