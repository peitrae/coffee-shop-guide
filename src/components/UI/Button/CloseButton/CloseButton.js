import React from "react";
import classes from "./CloseButton.module.css";

export const CloseButtonWhite = props => {
  const btnClose = [
    classes.BtnClose,
    classes.BtnCloseWhite,
    [props.className]
  ].join(" ");
  return <button className={btnClose} onClick={props.clicked}></button>;
};

export const CloseButton = props => {
  const btnClose = [classes.BtnClose, [props.className]].join(" ");
  return <button className={btnClose} onClick={props.clicked}></button>;
};

export default CloseButton;
