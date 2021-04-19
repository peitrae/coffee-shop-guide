import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Card from "../../../../components/UI/Card";
import { Button } from "../../../../components/UI/Button";
import InputField from "../../../../components/UI/InputField/InputField";
import defaultProfile from "../../../../assets/logo/defaultProfile.png";
import ErrorMessage from "../../../../components/ErrorMessage";
import * as actions from "../../../../store/actions/member";

const EditPassword = ({ handleClose: handleCloseEditPassword }) => {
  const dispatch = useDispatch();

  const [edit, setEdit] = useState({
    password: "",
    confirmPassword: "",
  });

  const { photoUrl, response } = useSelector((state) => state.member);

  useEffect(() => {
    if (response && !response.hasOwnProperty("error")) {
      dispatch(actions.deleteResponse());
      handleCloseEditPassword();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  const handleInputChange = (e) => {
    setEdit({ ...edit, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (edit.password === edit.confirmPassword) {
      dispatch(actions.editPassword(edit.password));
    } else {
      dispatch(
        actions.setResponse({
          error: {
            message: "PASSWORD_NOT_MATCH",
          },
        })
      );
    }
  };

  const handleClose = (e) => {
    e && e.preventDefault();
    dispatch(actions.deleteResponse());
    handleCloseEditPassword();
  };

  return (
    <Card className="profile" shadow={true}>
      <div className="profile__header">
        <img
          src={photoUrl || defaultProfile}
          alt="Profile"
          className="profile__image profile__image--main"
        />
      </div>
      <div className="profile__body">
        {response?.error ? (
          <ErrorMessage className="profile-edit__error">
            {response.error.message}
          </ErrorMessage>
        ) : null}
        <form className="profile-edit__form" onSubmit={handleSubmit}>
          <InputField
            name="password"
            type="password"
            onChange={handleInputChange}
            placeholder="Password"
            className="profile-edit__input margin-b-16"
          />
          <InputField
            name="confirmPassword"
            type="password"
            onChange={handleInputChange}
            placeholder="Confirm Password"
            className="profile-edit__input"
          />
        </form>
        <div className="profile-edit__actions">
          <Button
            type="outlined"
            className="profile-edit__btn margin-r-12"
            onClick={handleClose}
          >
            Back
          </Button>
          <Button onClick={handleSubmit} className="profile-edit__btn">
            Submit
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default EditPassword;
