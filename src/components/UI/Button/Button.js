import React, { forwardRef } from "react";

import classes from "./Button.module.css";
import "./Button.scss";

export const BtnLarge = (props) => {
  const style = [
    classes.BtnLarge,
    classes[props.btnType],
    [props.className],
  ].join(" ");
  return (
    <button className={style} onClick={props.clicked}>
      {props.children}
    </button>
  );
};

export const BtnMedium = (props) => {
  const { btnType, clicked, children, type, form } = props;

  const style = [classes.BtnMedium, classes[btnType]].join(" ");
  return (
    <button className={style} onClick={clicked} form={form} type={type}>
      {children}
    </button>
  );
};

export const BtnMediumText = (props) => {
  const style = [classes.BtnMediumText, classes[props.btnType]].join(" ");
  return (
    <button className={style} onClick={props.clicked}>
      {props.children}
    </button>
  );
};

export const BtnSmall = (props) => {
  const style = [
    classes.BtnSmall,
    classes[props.btnType],
    [props.className],
  ].join(" ");
  return (
    <button className={style} onClick={props.clicked}>
      {props.children}
    </button>
  );
};

export const Button = forwardRef(
  (
    {
      icon: Icon,
      type = "solid",
      color = "primary",
      size = "md",
      children,
      className = null,
      onClick,
    },
    ref
  ) => {
    return (
      <button
        className={`btn btn-${type} btn-${color} btn-${size} ${className}`}
        onClick={onClick}
        ref={ref}
      >
        {Icon ? <Icon className="btn-icon" /> : null}
        {children}
      </button>
    );
  }
);

export const PlainBtn = forwardRef(({ children, className, onClick }, ref) => (
  <button ref={ref} className={`btn-text ${className}`} onClick={onClick}>
    {children}
  </button>
));

export default Button;
