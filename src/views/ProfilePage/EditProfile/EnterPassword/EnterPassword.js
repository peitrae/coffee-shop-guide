import React from "react";
import Modal from "../../../../components/UI/Modal/Modal";

import TextForm from "../../../../components/UI/TextForm/TextForm";
import { BtnMedium } from "../../../../components/UI/Button/Button";
import classes from "./EnterPassword.module.css";

const EnterPassword = props => {
  const {
    show,
    value,
    cancelHandler,
    submitHandler,
    inputChangeHandler
  } = props;

  return (
    <Modal show={show} close={cancelHandler} header={"Enter Password"} small>
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
        <BtnMedium btnType="Green" clicked={submitHandler}>
          Submit
        </BtnMedium>
      </div>
    </Modal>
  );
};

export default EnterPassword;
