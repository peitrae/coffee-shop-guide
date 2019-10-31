import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

import Modal from "../../UI/Modal/Modal";
import { BtnMedium } from "../../UI/Button/Button";
import classesStyle from "./SignUp.module.css";
import * as actions from "../../../store/actions/member";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300
  },
  dense: {
    marginTop: 14
  },
  menu: {
    width: 200
  }
}));

const SignUp = props => {
  const classes = useStyles();

  const [signUp, setSignUp] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    password: ""
  });

  const inputChangeHandler = type => event => {
    setSignUp({ ...signUp, [type]: event.target.value });
  };

  const submitHandler = event => {
    event.preventDefault();
    props.onSignUp(signUp.email, signUp.password, signUp.name);
  };

  props.isAuthenticated && props.close();

  return (
    <Modal
      header={"Sign Up"}
      show={props.show}
      close={props.close}
      modalType={classesStyle.SignUp}
    >
      <form className={classesStyle.FormSignUp} onSubmit={submitHandler}>
        <TextField
          id="name"
          label="Name"
          className={classes.textField}
          value={signUp.name}
          onChange={inputChangeHandler("name")}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="email"
          label="Email"
          className={classes.textField}
          value={signUp.email}
          onChange={inputChangeHandler("email")}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="password"
          label="Password"
          className={classes.textField}
          onChange={inputChangeHandler("password")}
          type="password"
          autoComplete="current-password"
          margin="normal"
          variant="outlined"
        />

        <div className={classesStyle.BtnSignUp}>
          <BtnMedium btnType="Green" btnName={"Sign Up"} />
        </div>
      </form>
    </Modal>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.member.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSignUp: (email, password, name) =>
      dispatch(actions.signUp(email, password, name))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
