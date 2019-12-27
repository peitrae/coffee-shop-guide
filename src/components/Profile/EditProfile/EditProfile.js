import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";

import { BtnMedium, BtnSmall } from "../../../components/UI/Button/Button";
import ProfileImg from "../../../assets/logo/defaultProfile.png";
import classes from "./EditProfile.module.css";
import uploadImage from "../../../store/firebase/uploadImage";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
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

  const [profPictPreview, setProfPictPreview] = useState(ProfileImg);

  const getUserData = useSelector(state => state.member);
  const { name, email, photoUrl } = getUserData;

  const dispatch = useDispatch();
  const editProfile = (name, email, photoUrl) =>
    dispatch(actions.editProfile(name, email, photoUrl));
  const editPassword = password => dispatch(actions.editPassword(password));

  const [edit, setEdit] = useState({
    name: name,
    email: email,
    password: "",
    confirmPassword: "",
    photoUrl: photoUrl
  });

  const [showError, setShowError] = useState(false);

  if (photoUrl && profPictPreview === ProfileImg) setProfPictPreview(photoUrl);

  const classesMaterial = useStyles();

  const inputChangeHandler = type => event => {
    setEdit({ ...edit, [type]: event.target.value });
  };

  const profPictChangeHandler = event => {
    const img = event.target.files[0];
    const reference = "member/images/" + edit.name;

    uploadImage(img, reference)
      .then(response => {
        setEdit({ ...edit, photoUrl: response });
      })
      .catch(error => console.log(error));

    let reader = new FileReader();
    reader.onloadend = () => {
      setProfPictPreview(reader.result);
    };
    reader.readAsDataURL(img);
  };

  const submitEditHandler = event => {
    event.preventDefault();
    if (editType) {
      editProfile(edit.name, edit.email, edit.photoUrl);
      backToProfile();
    } else {
      if (edit.password !== edit.confirmPassword) {
        setShowError(true);
      } else {
        editPassword(edit.password);
        backToProfile();
      }
    }
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
    <React.Fragment>
      <img src={profPictPreview} alt={"Preview"} className={classes.ProfPict} />
      <div className={classes.ProfPict}>
        <div className={classes.EditProfPict}>
          <input
            id="uploadHeader"
            type="file"
            name={props.imageId}
            accept="image/*"
            className={classes.FileInput}
            onChange={profPictChangeHandler}
          />
          <label>
            <BtnSmall className={classes.ButtonSmall}>Upload</BtnSmall>
          </label>
        </div>
      </div>
      <form className={classes.FormEdit}>
        {content}
        {showError ? <ErrorMessage message={"PASSWORD_NOT_MATCH"} /> : null}
        <div className={classes.Btn}>
          <BtnMedium btnType="GreenBorder" clicked={props.backToProfile}>
            Back
          </BtnMedium>
          <BtnMedium btnType="Green" clicked={submitEditHandler}>
            Save
          </BtnMedium>
        </div>
      </form>
    </React.Fragment>
  );
};

export default EditComponent;
