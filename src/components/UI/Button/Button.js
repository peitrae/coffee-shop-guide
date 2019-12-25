import React from "react";

import classes from "./Button.module.css";

export const BtnMedium = props => {
  const btnMedium = [classes.ButtonMedium, classes[props.btnType]].join(" ");
  return (
    <button className={btnMedium} onClick={props.clicked}>
      {props.btnName}
    </button>
  );
};

export const BtnLarge = props => {
  const btnLarge = [classes.ButtonLarge, classes[props.btnType], [props.className]].join(" ");
  return (
    <button className={btnLarge} onClick={props.clicked}>
      {props.btnName}
    </button>
  );
};

export const BtnSmall = props => {
  const btnSmall = [classes.ButtonSmall, classes[props.btnType], [props.className]].join(" ");
  return (
    <button className={btnSmall} onClick={props.clicked}>
      {props.children}
    </button>
  );
};

export const BtnClose = props => {
  const btnClose = [classes.ButtonClose, [props.classes]].join(' ');
  return (
    <button className={btnClose} onClick={props.clicked}>
      X
    </button>
  )
}
