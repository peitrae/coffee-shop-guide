import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import TextForm from "../../../components/UI/TextForm/TextForm";
import Modal from "../../UI/Modal/Modal";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import { BtnMedium } from "../../UI/Button/Button";
import classes from "./SignUp.module.css";
import * as actions from "../../../store/actions/member";

const SignUp = props => {

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
        <TextForm
          id="name"
          label="Name"
          className={"textField-3"}
          value={signUp.name}
          inputHandler={inputChangeHandler("name")}
        />
        <TextForm
          id="email"
          label="Email"
          className={"textField-3"}
          value={signUp.email}
          inputHandler={inputChangeHandler("email")}
        />
        <TextForm
          id="password"
          label="Password"
          className={"textField-3"}
          inputHandler={inputChangeHandler("password")}
          type="password"
          autoComplete="current-password"
          placeholder="At least 6 characters"
        />

        <div className={classes.BtnSignUp}>
          <BtnMedium btnType="Green">Sign Up</BtnMedium>
        </div>
      </form>
    </Modal>
  );
};

export default SignUp;
