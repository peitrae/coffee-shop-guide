import React from "react";

import Card from "../Card/Card";
import CloseButton from "../Button/CloseButton/CloseButton";
import classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";

const modal = props => (
  <React.Fragment>
    <Backdrop show={props.show} close={props.close} />
    <Card className={[classes.Modal, [props.modalType]].join(" ")}>
      <CloseButton className={classes.Close} clicked={props.close} />
      <h1 className={props.small ? classes.SmallHeader : classes.Header}>
        {props.header}
      </h1>
      {props.children}
    </Card>
  </React.Fragment>
);

export default modal;
