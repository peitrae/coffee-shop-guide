import React from "react";

import Card from "../Card/Card";
import CloseButton from "../Button/CloseButton/CloseButton";
import classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";

const modal = props => {
  return (
    <React.Fragment>
      <Backdrop show={props.show} close={props.close} />
      <Card className={[classes.Modal, [props.classes], props.className].join(" ")}>
        <CloseButton className={classes.Close} clicked={props.close} />
        {props.children}
      </Card>
    </React.Fragment>
  );
};

export default modal;
