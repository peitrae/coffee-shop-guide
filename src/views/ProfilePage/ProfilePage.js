import React, { useState } from "react";
import { useSelector } from "react-redux";

import Profile from "./Profile/Profile";
import EditProfile from "./EditProfile/EditProfile";
import EditPassword from "./EditPassword/EditPassword";
import VerificationOwner from "./VerificationOwner/VerificationOwner";
import CoffeeShopList from "./CoffeeShopList/CoffeeShopList";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./ProfilePage.module.css";

const ProfilePage = () => {
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showEditPassword, setShowEditPassword] = useState(false);
  const [showVerification, setShowVerification] = useState(false);

  const userData = useSelector(state => state.member);
  const { localId, emailVerified, name, email, photoUrl } = userData;

  const editProfileHandler = () => setShowEditProfile(true);

  const editProfileCancelHandler = () => setShowEditProfile(false);

  const editPasswordHandler = () => setShowEditPassword(true);

  const editPasswordCancelHandler = () => setShowEditPassword(false);

  const closeVerificationHandler = () => setShowVerification(false);

  const showVerificationHandler = () => setShowVerification(true);

  if (!userData) return <Spinner />;

  return (
    <div className={classes.ProfilePage}>
      {!showEditProfile && !showEditPassword ? (
        <Profile
          name={name}
          email={email}
          photoUrl={photoUrl}
          emailVerified={emailVerified}
          showEditProfile={editProfileHandler}
          showEditPassword={editPasswordHandler}
          showVerificationHandler={showVerificationHandler}
        />
      ) : showEditProfile ? (
        <EditProfile
          name={name}
          email={email}
          photoUrl={photoUrl}
          cancelEditProfile={editProfileCancelHandler}
        />
      ) : showEditPassword ? (
        <EditPassword
          photoUrl={photoUrl}
          cancelEditPassword={editPasswordCancelHandler}
        />
      ) : null}
      {showVerification ? (
        <VerificationOwner
          show={showVerification}
          close={closeVerificationHandler}
        />
      ) : null}
      {emailVerified ? <CoffeeShopList localId={localId} /> : null}
    </div>
  );
};

export default ProfilePage;
