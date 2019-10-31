import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

import classesStyle from "./EditProfile.module.css";
import { BtnMedium } from "../../../components/UI/Button/Button";
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
  },
  dense: {
    marginTop: 14
  },
  menu: {
    width: 200
  }
}));

const EditComponent = props => {
  // Edit Photo Profile

  const { editType, editProfile, editPassword, getUserData } = props;
  const { name, email, photoURL } = getUserData;

  const [edit, setEdit] = useState({
    name: name,
    email: email,
    password: "",
    confirmPassword: ""
  });

  const classes = useStyles();

  const submitEditHandler = event => {
    event.preventDefault();
    editType ? editProfile(edit.name, edit.email) : editPassword(edit.password);
    props.backToProfile();
  };

  const inputChangeHandler = type => event => {
    setEdit({ ...edit, [type]: event.target.value });
  };

  let content = (
    <div>
      <TextField
        id="password"
        label="New Password"
        className={classes.textField}
        onChange={inputChangeHandler("password")}
        type="password"
        autoComplete="current-password"
        margin="normal"
        variant="outlined"
      />
      <TextField
        id="password"
        label="Confirm New Password"
        className={classes.textField}
        onChange={inputChangeHandler("confirmPassword")}
        type="password"
        autoComplete="current-password"
        margin="normal"
        variant="outlined"
      />
    </div>
  ); // Default Edit Password

  if (props.editType) {
    content = (
      <div>
        <TextField
          id="name"
          label="Name"
          className={classes.textField}
          value={edit.name}
          onChange={inputChangeHandler("name")}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="email"
          label="Email"
          className={classes.textField}
          value={edit.email}
          onChange={inputChangeHandler("email")}
          margin="normal"
          variant="outlined"
        />
      </div>
    );
  }

  return (
    <form className={classesStyle.FormEdit}>
      {content}
      <div className={classesStyle.Btn}>
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

const mapStateToProps = state => {
  return {
    getUserData: state.member
  };
};

const mapDispatchToProps = dispatch => {
  return {
    editProfile: (name, email) => dispatch(actions.editProfile(name, email)),
    editPassword: password => dispatch(actions.editPassword(password))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditComponent);
