import React from "react";
import Card from "../Card/Card";
import classes from "./Modal.module.css";
import Backdrop from '../Backdrop/Backdrop';

const modal = props => (
  <React.Fragment>
    <Backdrop show={props.show} clicked={props.clicked} />
    <Card cardType={classes.Modal}>
      <h1 className={classes.Header}>{props.header}</h1>
      {props.children}
    </Card>
  </React.Fragment>
);

export default modal;
