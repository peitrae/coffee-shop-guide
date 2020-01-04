import React, { useState } from "react";
import { useSelector } from "react-redux";

import TextForm from "../../../components/UI/TextForm/TextForm";
import Modal from "../../UI/Modal/Modal";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import { BtnMedium } from "../../UI/Button/Button";
import classes from "./Login.module.css";


const Login = props => {

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
      {errorMessage ? <ErrorMessage message={errorMessage} /> : null}
      <form className={classes.FormLogin} onSubmit={submitHandler}>
        <TextForm
          id="email"
          label="Email"
          className={"textField-3"}
          value={login.email}
          inputHandler={inputChangeHandler("email")}
        />
        <TextForm
          id="password"
          label="Password"
          className={"textField-3"}
          inputHandler={inputChangeHandler("password")}
          type="password"
        />

        <div className={classes.BtnLogin}>
          <BtnMedium btnType="Green" clicked={signup}>
            Login
          </BtnMedium>
        </div>
      </form>
    </Modal>
  );
};

export default Login;
