import React from "react";

import classes from "./Button.module.css";

export const BtnLarge = props => {
  const style = [
    classes.BtnLarge,
    classes[props.btnType],
    [props.className]
  ].join(" ");
  return (
    <button className={style} onClick={props.clicked}>
      {props.children}
    </button>
  );
};

export const BtnMedium = props => {
  const {btnType, clicked, children, type, form} = props;

  const style = [classes.BtnMedium, classes[btnType]].join(" ");
  return (
    <button className={style} onClick={clicked} form={form} type={type}>
      {children}
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
  const style = [
    classes.BtnSmall,
    classes[props.btnType],
    [props.className]
  ].join(" ");
  return (
    <button className={style} onClick={props.clicked}>
      {props.children}
    </button>
  );
};
