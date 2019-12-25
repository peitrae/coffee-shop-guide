import React, { useState } from "react";
import { useSelector } from 'react-redux';

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

  const profPict = useSelector(state => state.member.photoUrl)

  const editProfileHandler = () => {
    setIsEdit({ ...isEdit, edit: true });
  };

  const editPasswordHandler = () => {
    setIsEdit({ edit: true, editProfile: false });
  };

  const backProfileHandler = () => {
    setIsEdit({ edit: false, editProfile: true });
  };

  return (
    <Card cardType={classes.ProfileCard}>
      <div className={classes.GreenDiv}></div>
      <img
        src={profPict || ProfileImg}
        alt="Profile"
        className={classes.ImgProfile}
      />
      <div className={classes.Section}>
        {!isEdit.edit ? (
          <MainProfile
            editProfileClicked={editProfileHandler}
            editPasswordClicked={editPasswordHandler}
            showVerificationHandler={props.showVerificationHandler}
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
