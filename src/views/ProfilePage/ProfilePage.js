import React, { useState } from "react";

import ProfileCard from "../../components/UI/Card/ProfileCard/ProfileCard";
import Profile from "./Profile/Profile";
import EditProfile from "./EditProfile/EditProfile";
import classes from "./ProfilePage.module.css";

const ProfilePage = props => {
  const [isEdit, setIsEdit] = useState({
    edit: false, // !edit ? Profile : Edit Component
    editProfile: true // editProfile ? Edit Profile : Edit Password
  });

  const editProfileHandler = () => {
    setIsEdit({ ...isEdit, edit: true });
  };

  const editPasswordHandler = () => {
    setIsEdit({ edit: true, editProfile: false });
  };

  const backProfileHandler = event => {
    event.preventDefault();
    setIsEdit({ edit: false, editProfile: true });
  };

  console.log("Edit", isEdit.edit)
  console.log("Edit Profile", isEdit.editProfile)

  return (
    <div className={classes.ProfilePage}>
      <ProfileCard profilePict="./ProfilePicture.png">
        {!isEdit.edit ? (
          <Profile
            editProfileClicked={editProfileHandler}
            editPasswordClicked={editPasswordHandler}
          />
        ) : (
          <EditProfile editType={isEdit.editProfile} btnBack={backProfileHandler}/>
        )}
      </ProfileCard>
    </div>
  );
};

export default ProfilePage;
