import React, { useState } from "react";
import { connect } from "react-redux";

import classes from "./Profile.module.css";
import Card from "../UI/Card/Card";
import MainProfile from "./MainProfile/MainProfile";
import ProfileImg from "../../assets/logo/defaultProfile.png";
import EditProfile from "./EditProfile/EditProfile";

const Profile = props => {
  const [isEdit, setIsEdit] = useState({
    edit: false, // edit ? Edit Component : Profile Component
    editProfile: true // editProfile ? Edit Profile : Edit Password
  });

  const editProfileHandler = () => {
    setIsEdit({ ...isEdit, edit: true });
  };

  const editPasswordHandler = () => {
    setIsEdit({ edit: true, editProfile: false });
  };

  const backProfileHandler = () => {
    setIsEdit({ edit: false, editProfile: true });
  };

  const toVerificationOwner = () => {
    props.history.push("/verificationOwner")
  }

  return (
    <Card cardType={classes.ProfileCard}>
      <div className={classes.GreenDiv}></div>
      <img
        src={ProfileImg}
        alt="Profile Picture"
        className={classes.ImgProfile}
      />
      <div className={classes.Section}>
        {!isEdit.edit ? (
          <MainProfile
            editProfileClicked={editProfileHandler}
            editPasswordClicked={editPasswordHandler}
            toVerificationOwner={toVerificationOwner}
          />
        ) : (
          <EditProfile
            editType={isEdit.editProfile}
            backToProfile={backProfileHandler}
          />
        )}
      </div>
    </Card>
  );
};
export default Profile;
