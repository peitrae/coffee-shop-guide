import React, { useState } from "react";
import { useDispatch } from "react-redux";

import TextForm from "../../../components/UI/TextForm/TextForm";
import UploadButton from "../../../components/UI/Button/UploadButton/UploadButton";
import ProfileCard from "../../../components/UI/Card/ProfileCard/ProfileCard";
import ProfileImg from "../../../assets/logo/defaultProfile.png";
import classes from "./EditProfile.module.css";
import { BtnMedium, BtnSmall } from "../../../components/UI/Button/Button";
import uploadImage from "../../../store/firebase/uploadImage";
import * as actions from "../../../store/actions/member";
import EnterPassword from "./EnterPassword/EnterPassword";

const EditComponent = props => {
  const [profPictPreview, setProfPictPreview] = useState(ProfileImg);
  const [showEnterPassword, setShowEnterPassword] = useState(false);

  const { name, email, photoUrl, cancelEditProfile } = props;

  const dispatch = useDispatch();
  const editProfile = (name, email, photoUrl, password) =>
    dispatch(actions.editProfile(name, email, photoUrl, password));

  const [edit, setEdit] = useState({
    name: name,
    email: email,
    photoUrl: photoUrl,
    password: ""
  });

  if (photoUrl && profPictPreview === ProfileImg) setProfPictPreview(photoUrl);

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

  const submitEditHandler = () => {
    editProfile(edit.name, edit.email, edit.photoUrl, edit.password);
    cancelEditProfile();
  };

  const cancelEnterPasswordHandler = () => setShowEnterPassword(false);

  const checkIfEmailChange = event => {
    event.preventDefault();
    email !== edit.email ? setShowEnterPassword(true) : submitEditHandler();
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
    <React.Fragment>
      <ProfileCard image={image}>
        <form className={classes.FormEdit}>
          <div>
            <TextForm
              id="name"
              label="Name"
              className={"textField-3"}
              value={edit.name}
              inputHandler={inputChangeHandler("name")}
            />
            <TextForm
              id="email"
              label="Email"
              className={"textField-3"}
              value={edit.email}
              inputHandler={inputChangeHandler("email")}
            />
          </div>
          <div className={classes.BtnGroup}>
            <BtnMedium btnType="GreenBorder" clicked={cancelEditProfile}>
              Back
            </BtnMedium>
            <BtnMedium btnType="Green" clicked={checkIfEmailChange}>
              Save
            </BtnMedium>
          </div>
        </form>
      </ProfileCard>
      {showEnterPassword ? (
        <EnterPassword
          inputChangeHandler={inputChangeHandler}
          value={edit.password}
          show={showEnterPassword}
          cancelHandler={cancelEnterPasswordHandler}
          submitHandler={submitEditHandler}
        />
      ) : null}
    </React.Fragment>
  );
};

export default EditComponent;
