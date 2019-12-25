import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";

import UploadButton from "../../../components/UI/Button/UploadButton/UploadButton";
import ProfileCard from "../../../components/UI/Card/ProfileCard/ProfileCard";
import ProfileImg from "../../../assets/logo/defaultProfile.png";
import classes from "./EditProfile.module.css";
import { BtnMedium, BtnSmall } from "../../../components/UI/Button/Button";
import uploadImage from "../../../store/firebase/uploadImage";
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

  const [profPictPreview, setProfPictPreview] = useState(ProfileImg);

  const { name, email, photoURL, cancelEditProfile } = props;

  const dispatch = useDispatch();
  const editProfile = (name, email, photoURL) =>
    dispatch(actions.editProfile(name, email, photoURL));

  const [edit, setEdit] = useState({
    name: name,
    email: email,
    photoURL: photoURL
  });

  if (photoURL && profPictPreview === ProfileImg) setProfPictPreview(photoURL);

  const classesMaterial = useStyles();

  const inputChangeHandler = type => event => {
    setEdit({ ...edit, [type]: event.target.value });
  };

  const profPictChangeHandler = event => {
    const img = event.target.files[0];
    const reference = "member/images/" + edit.name;

    uploadImage(img, reference)
      .then(response => {
        setEdit({ ...edit, photoURL: response });
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
    editProfile(edit.name, edit.email, edit.photoURL);
    cancelEditProfile();
  };

  const image = (
    <div className={classes.ImgProfile}>
      <UploadButton
        background={profPictPreview}
        btnType={"Circle"}
        uploadHandler={() => profPictChangeHandler}
        className={classes.EditProfPict}
      >
        <BtnSmall className={classes.BtnSmall}>
          <label htmlFor="uploadImage" className={classes.BtnSmall}>
            Edit
          </label>
        </BtnSmall>
      </UploadButton>
    </div>
  );

  return (
    <ProfileCard image={image}>
      <form className={classes.FormEdit}>
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
        <div className={classes.BtnGroup}>
          <BtnMedium
            btnName="Back"
            btnType="GreenBorder"
            clicked={cancelEditProfile}
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
