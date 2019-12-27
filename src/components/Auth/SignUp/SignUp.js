import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";

import Modal from "../../UI/Modal/Modal";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import { BtnMedium } from "../../UI/Button/Button";
import classes from "./SignUp.module.css";
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
  }
}));

const SignUp = props => {
  const classesMaterial = useStyles();

  const [signUp, setSignUp] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    password: ""
  });

  const errorMessage = useSelector(state => state.member.error);
  const isAuthenticated = useSelector(state => state.member.token !== null);

  const dispatch = useDispatch();
  const onSignUp = (email, password, name) =>
    dispatch(actions.signUp(email, password, name));

  const inputChangeHandler = type => event => {
    setSignUp({ ...signUp, [type]: event.target.value });
  };

  const submitHandler = event => {
    event.preventDefault();
    onSignUp(signUp.email, signUp.password, signUp.name);
  };

  if (isAuthenticated) props.close();

  return (
    <Modal
      header={"Sign Up"}
      show={props.show}
      close={props.close}
      modalType={classes.SignUp}
    >
      {errorMessage ? <ErrorMessage message={errorMessage} /> : null}
      <form className={classes.FormSignUp} onSubmit={submitHandler}>
        <TextField
          id="name"
          label="Name"
          className={classesMaterial.textField}
          value={signUp.name}
          onChange={inputChangeHandler("name")}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="email"
          label="Email"
          className={classesMaterial.textField}
          value={signUp.email}
          onChange={inputChangeHandler("email")}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="password"
          label="Password"
          className={classesMaterial.textField}
          onChange={inputChangeHandler("password")}
          type="password"
          autoComplete="current-password"
          margin="normal"
          variant="outlined"
          placeholder="At least 6 characters"
        />

        <div className={classes.BtnSignUp}>
          <BtnMedium btnType="Green" btnName={"Sign Up"} />
        </div>
      </form>
    </Modal>
  );
};

export default SignUp;
