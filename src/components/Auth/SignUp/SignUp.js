import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

import Modal from "../../UI/Modal/Modal";
import { BtnMedium } from "../../UI/Button/Button";
import style from "./SignUp.module.css";
import * as actions from "../../../store/actions/index";

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

  const { authRedirectPath, onSetAuthRedirectPath} = props;

  useEffect(() => {
    if (authRedirectPath !== "/") {
      onSetAuthRedirectPath();
    }
  }, [authRedirectPath, onSetAuthRedirectPath]);

  const inputChangeHandler = type => event => {
    setSignUp({ ...signUp, [type]: event.target.value });
  };
  
  const submitHandler = event => {
    event.preventDefault();
    props.onAuth(signUp.name, signUp.phoneNumber, signUp.email, signUp.password, props.auth);
  };

  return (
    <Modal header={"Daftar"} show={props.show} clicked={props.clicked}>
      {props.isAuthenticated ? props.clicked() : null}
      <form className={style.FormSignUp} onSubmit={submitHandler}>
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

        <div className={style.BtnSignUp}>
          <BtnMedium
            btnType="Green"
            clicked={props.signup}
            btnName={"Daftar"}
          />
        </div>
      </form>
    </Modal>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (name, phoneNumber, email, password, isSignup) =>
      dispatch(actions.auth(name, phoneNumber, email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/"))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
