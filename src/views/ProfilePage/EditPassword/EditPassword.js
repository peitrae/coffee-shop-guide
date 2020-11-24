import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import TextForm from "../../../components/UI/TextForm/TextForm";
import { BtnMedium } from "../../../components/UI/Button/Button";
import ProfileCard from "../../../components/UI/Card/ProfileCard/ProfileCard";
import ProfileImg from "../../../assets/logo/defaultProfile.png";
import classes from "./EditPassword.module.css";
import ErrorMessage from "../../../components/ErrorMessage/ErrorMessage";
import * as actions from "../../../store/actions/member";

const EditComponent = ({ cancelEditPassword }) => {
  const dispatch = useDispatch();

  const { photoUrl } = useSelector((state) => state.member);

  const editPassword = (password) => dispatch(actions.editPassword(password));

  const [edit, setEdit] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showError, setShowError] = useState(false);

  const inputChangeHandler = (type) => (event) => {
    setEdit({ ...edit, [type]: event.target.value });
  };

  const submitEditHandler = (event) => {
    event.preventDefault();
    if (edit.password === edit.confirmPassword) {
      editPassword(edit.password);
      cancelEditPassword();
    } else {
      setShowError(true);
    }
  };

  const image = (
    <img
      src={photoUrl || ProfileImg}
      alt="Profile"
      className={classes.ImgProfile}
    />
  );

  return (
    <ProfileCard image={image}>
      {showError ? <ErrorMessage>PASSWORD_NOT_MATCH</ErrorMessage> : null}
      <form className={classes.FormEdit}>
        <div className={classes.TextFormGroup}>
          <TextForm
            id="password"
            label="New Password"
            className={"textField-3"}
            inputHandler={inputChangeHandler("password")}
            type="password"
          />
          <TextForm
            id="password"
            label="Confirm New Password"
            className={"textField-3"}
            inputHandler={inputChangeHandler("confirmPassword")}
            type="password"
          />
        </div>
        <div className={classes.BtnGroup}>
          <BtnMedium btnType="GreenBorder" clicked={cancelEditPassword}>
            Back
          </BtnMedium>
          <BtnMedium btnType="Green" clicked={submitEditHandler}>
            Save
          </BtnMedium>
        </div>
      </form>
    </ProfileCard>
  );
};

export default EditComponent;
