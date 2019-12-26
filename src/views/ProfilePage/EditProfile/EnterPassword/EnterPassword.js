import React, { useState } from "react";
import Modal from "../../../../components/UI/Modal/Modal";

import TextForm from "../../../../components/UI/TextForm/TextForm";
import CloseButton from "../../../../components/UI/Button/CloseButton/CloseButton";
import { BtnMedium } from "../../../../components/UI/Button/Button";
import classes from "./EnterPassword.module.css";

const EnterPassword = props => {
  const {
    showEnterPassword,
    value,
    cancelEnterPassword,
    submitHandler,
    inputChangeHandler
  } = props;

  return (
    <Modal show={showEnterPassword} close={cancelEnterPassword}>
      <CloseButton className={classes.Close} clicked={cancelEnterPassword} />
      <h2>Enter Password</h2>
      <p className={classes.Desc}>Enter your password to change the email.</p>
      <form>
        <TextForm
          id={"password"}
          label={"Password"}
          className={"textField-3"}
          value={value}
          type={"password"}
          inputHandler={inputChangeHandler("password")}
        />
      </form>
      <div className={classes.BtnSubmit}>
        <BtnMedium btnName="Submit" btnType="Green" clicked={submitHandler} />
      </div>
    </Modal>
  );
};

export default EnterPassword;
