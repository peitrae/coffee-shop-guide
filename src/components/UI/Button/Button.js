import React from "react";

import classes from "./Button.module.css";

export const BtnLarge = props => {
  const btnLarge = [
    classes.BtnLarge,
    classes[props.btnType],
    [props.className]
  ].join(" ");
  return (
    <button className={btnLarge} onClick={props.clicked}>
      {props.btnName}
    </button>
  );
};

export const BtnMedium = props => {
  const btnMedium = [classes.BtnMedium, classes[props.btnType]].join(" ");
  return (
    <button className={btnMedium} onClick={props.clicked}>
      {props.children}
    </button>
  );
};

export const BtnMediumText = props => {
  const style = [classes.BtnMediumText, classes[props.btnType]].join(" ");
  return (
    <button className={style} onClick={props.clicked}>
      {props.children}
    </button>
  );
};

export const BtnSmall = props => {
  const btnSmall = [
    classes.BtnSmall,
    classes[props.btnType],
    [props.className]
  ].join(" ");
  return (
    <button className={btnSmall} onClick={props.clicked}>
      {props.children}
    </button>
  );
};
