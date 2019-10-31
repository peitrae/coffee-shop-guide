import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

import Modal from "../../UI/Modal/Modal";
import { BtnMedium } from "../../UI/Button/Button";
import style from "./Login.module.css";

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

const Login = props => {
  const classes = useStyles();

  const [login, setLogin] = useState({
    phoneNumber: "",
    email: "",
    password: ""
  });

  const inputChangeHandler = type => event => {
    setLogin({ ...login, [type]: event.target.value });
  };

  const submitHandler = event => {
    event.preventDefault();
  };

  return (
    <Modal header={"Masuk"} show={props.show} clicked={props.clicked}>
      <form className={style.FormLogin} onSubmit={submitHandler}>
        <TextField
          id="email"
          label="Email"
          className={classes.textField}
          value={login.email}
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

        <div className={style.BtnLogin}>
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

export default Login;
