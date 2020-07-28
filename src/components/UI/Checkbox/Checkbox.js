import React from 'react';

import classes from "./Checkbox.module.css";

const Checkbox = (props) => {

  return (
    <label className={classes.Checkbox}>
      <input
        type="checkbox"
        checked={props.checked}
        onChange={props.changed}
        className={classes.Input}
      />
      {props.children}
      <span
        className={classes.Checkmark}
      ></span>
    </label>
  );
};

export default Checkbox;
