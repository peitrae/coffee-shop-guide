import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";

import { BtnMedium } from "../../../components/UI/Button/Button";
import ProfileCard from "../../../components/UI/Card/ProfileCard/ProfileCard";
import ProfileImg from "../../../assets/logo/defaultProfile.png";
import classes from "./EditPassword.module.css";
import ErrorMessage from "../../../components/ErrorMessage/ErrorMessage";
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

const EditComponent = props => {
  const { photoUrl, cancelEditPassword } = props;

  const dispatch = useDispatch();
  const editPassword = password => dispatch(actions.editPassword(password));

  const [edit, setEdit] = useState({
    password: "",
    confirmPassword: ""
  });

  const [showError, setShowError] = useState(false);

  const classesMaterial = useStyles();

  const inputChangeHandler = type => event => {
    setEdit({ ...edit, [type]: event.target.value });
  };

  const submitEditHandler = event => {
    event.preventDefault();
    if (edit.password !== edit.confirmPassword) {
      setShowError(true);
    } else {
      editPassword(edit.password);
      cancelEditPassword();
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
      {showError ? <ErrorMessage message={"PASSWORD_NOT_MATCH"} /> : null}
      <form className={classes.FormEdit}>
        <div>
          <TextField
            id="password"
            label="New Password"
            className={classesMaterial.textField}
            onChange={inputChangeHandler("password")}
            type="password"
            autoComplete="current-password"
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="password"
            label="Confirm New Password"
            className={classesMaterial.textField}
            onChange={inputChangeHandler("confirmPassword")}
            type="password"
            autoComplete="current-password"
            margin="normal"
            variant="outlined"
          />
        </div>
        <div className={classes.BtnGroup}>
          <BtnMedium
            btnName="Back"
            btnType="GreenBorder"
            clicked={cancelEditPassword}
          />
          <BtnMedium
            btnName="Save"
            btnType="Green"
            clicked={submitEditHandler}
          />
        </div>
      </form>
    </ProfileCard>
  );
};

export default EditComponent;
