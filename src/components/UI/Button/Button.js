import React from "react";
import style from "./Button.module.css";

export const BtnMedium = props => {
  const btnMedium = [style.ButtonMedium, style[props.btnType]].join(" ");
  return (
    <button className={btnMedium} onClick={props.clicked}>
      {props.btnName}
    </button>
  );
};

export const BtnLarge = props => {
  return (
    <button className={style.ButtonLarge} onClick={props.clicked}>
      {props.btnName}
    </button>
  );
};
