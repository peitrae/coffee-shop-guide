import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";

import { BtnMedium } from "../../../components/UI/Button/Button";
import classes from "./EditProfile.module.css";
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
  const { editType, backToProfile } = props;

  const getUserData = useSelector(state => state.member);

  const dispatch = useDispatch();
  const editProfile = (name, email) =>
    dispatch(actions.editProfile(name, email));
  const editPassword = password => dispatch(actions.editPassword(password));

  const { name, email, photoURL } = getUserData;

  const [edit, setEdit] = useState({
    name: name,
    email: email,
    password: "",
    confirmPassword: ""
  });

  const classesMaterial = useStyles();

  const submitEditHandler = event => {
    event.preventDefault();
    editType ? editProfile(edit.name, edit.email) : editPassword(edit.password);
    backToProfile();
  };

  const inputChangeHandler = type => event => {
    setEdit({ ...edit, [type]: event.target.value });
  };

  let content = (
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
  ); // Default Edit Password

  if (editType) {
    content = (
      <div>
        <TextField
          id="name"
          label="Name"
          className={classesMaterial.textField}
          value={edit.name}
          onChange={inputChangeHandler("name")}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="email"
          label="Email"
          className={classesMaterial.textField}
          value={edit.email}
          onChange={inputChangeHandler("email")}
          margin="normal"
          variant="outlined"
        />
      </div>
    );
  }

  return (
    <form className={classes.FormEdit}>
      {content}
      <div className={classes.Btn}>
        <BtnMedium
          btnName="Kembali"
          btnType="GreenBorder"
          clicked={props.backToProfile}
        />
        <BtnMedium
          btnName="Simpan"
          btnType="Green"
          clicked={submitEditHandler}
        />
      </div>
    </form>
  );
};

export default EditComponent;
