import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import Modal from "../../UI/Modal/Modal";
import { BtnMedium } from "../../UI/Button/Button";
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
  },
  dense: {
    marginTop: 14
  },
  menu: {
    width: 200
  }
}));

const Login = props => {
  const materialUi = useStyles();

  const [login, setLogin] = useState({
    email: "",
    password: ""
  });

  const {
    header,
    isAuthenticated,
    show,
    close,
    clicked,
    signup,
    submit
  } = props;

  const inputChangeHandler = type => event => {
    setLogin({ ...login, [type]: event.target.value });
  };

  const submitHandler = event => {
    event.preventDefault();
    submit(login.email, login.password);
  };

  isAuthenticated && close();

  return (
    <Modal
      header={header}
      show={show}
      close={close}
      clicked={clicked}
      modalType={classes.Login}
    >
      <form className={classes.FormLogin} onSubmit={submitHandler}>
        <TextField
          id="email"
          label="Email"
          className={materialUi.textField}
          value={login.email}
          onChange={inputChangeHandler("email")}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="password"
          label="Password"
          className={materialUi.textField}
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

const mapStateToProps = state => {
  return {
    isAuthenticated: state.member.token !== null
  };
};

export default connect(mapStateToProps)(Login);
