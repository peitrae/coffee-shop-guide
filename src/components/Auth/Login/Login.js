import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import Modal from "../../UI/Modal/Modal";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import { BtnMedium } from "../../UI/Button/Button";
import { CloseButton } from "../../UI/Button/CloseButton/CloseButton";
import classes from "./Login.module.css";

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

const Login = props => {
  const classesMaterial = useStyles();

  const [login, setLogin] = useState({
    email: "",
    password: ""
  });

  const errorMessage = useSelector(state => state.member.error);
  const isAuthenticated = useSelector(state => state.member.token !== null);

  const { header, show, close, clicked, signup, submit } = props;

  const inputChangeHandler = type => event => {
    setLogin({ ...login, [type]: event.target.value });
  };

  const submitHandler = event => {
    event.preventDefault();
    submit(login.email, login.password);
  };

  if (isAuthenticated) close();

  return (
    <Modal
      header={header}
      show={show}
      close={close}
      clicked={clicked}
      modalType={classes.Login}
    >
      <CloseButton className={classes.Close} clicked={close}/>
      {errorMessage ? <ErrorMessage message={errorMessage} /> : null}
      <form className={classes.FormLogin} onSubmit={submitHandler}>
        <TextField
          id="email"
          label="Email"
          className={classesMaterial.textField}
          value={login.email}
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
        />

        <div className={classes.BtnLogin}>
          <BtnMedium btnType="Green" clicked={signup} btnName={"Login"} />
        </div>
      </form>
    </Modal>
  );
};

export default Login;
