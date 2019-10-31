import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import classes from "./BubbleBox.module.css";
import Card from "../../Card/Card";
import Backdrop from "../../Backdrop/Backdrop";
import * as actions from "../../../../store/actions/member";

const bubleBox = props => {

  const logoutHandler = () => {
    props.onLogout();
    props.close();
  };
  
  return (
    <React.Fragment>
      <Backdrop
        show={props.show}
        close={props.close}
        backdropType="Transparent"
      />
      <Card cardType={classes.BubbleBox}>
        <NavLink to={"/profile"} className={classes.Link}>
          Profile
        </NavLink>
        <button className={classes.Logout} onClick={logoutHandler}>
          Logout
        </button>
      </Card>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.member.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actions.logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(bubleBox);
