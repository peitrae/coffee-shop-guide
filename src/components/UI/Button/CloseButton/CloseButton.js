import React from "react";
import classes from "./CloseButton.module.css"

export const CloseButtonFull = props => {
  const btnClose = [classes.BtnClose, classes.BtnCloseFull, [props.className]].join(' ')
  return (
    <button className={btnClose} onClick={props.clicked}></button>
  )
}

export const CloseButton = props => {
  const btnClose = [classes.BtnClose, [props.className]].join(' ')
  return (
    <button className={btnClose} onClick={props.clicked}></button>
  )
}
  
;

export default CloseButton;
