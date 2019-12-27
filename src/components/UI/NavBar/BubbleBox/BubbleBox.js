import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";

import classes from "./BubbleBox.module.css";
import Card from "../../Card/Card";
import Backdrop from "../../Backdrop/Backdrop";
import * as actions from "../../../../store/actions/member";

const BubbleBox = props => {
  const dispatch = useDispatch();
  const onLogout = () => dispatch(actions.logout());

  const logoutHandler = () => {
    onLogout();
    props.close();
  };

  return (
    <React.Fragment>
      <Backdrop
        show={props.show}
        close={props.close}
        backdropType="Transparent"
      />
      <Card className={classes.BubbleBox}>
        <NavLink to={"/profile"} className={classes.Link}>
          <div onClick={props.close}>Profile</div>
        </NavLink>
        <button className={classes.Logout} onClick={logoutHandler}>
          Logout
        </button>
      </Card>
    </React.Fragment>
  );
};

export default BubbleBox;
