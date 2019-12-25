import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";

import Profile from "./Profile/Profile";
import EditProfile from "./EditProfile/EditProfile";
import EditPassword from "./EditPassword/EditPassword";
import VerificationOwner from "./VerificationOwner/VerificationOwner";
import Spinner from "../../components/UI/Spinner/Spinner";
import MiniLists from "../../components/MiniLists/MiniLists";
import classes from "./ProfilePage.module.css";

const ProfilePage = () => {
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showEditPassword, setShowEditPassword] = useState(false);
  const [deleteClicked, setDeleteClicked] = useState(false);
  const [showVerification, setShowVerification] = useState(false);

  const userData = useSelector(state => state.member);
  const {
    localId,
    emailVerified,
    coffeeShopList,
    name,
    email,
    photoURL
  } = userData;

  const dispatch = useDispatch();
  const getCoffeeShopUploadedBy = useCallback(
    localId => dispatch(actions.getCoffeeShopUploadedBy(localId)),
    [dispatch]
  );

  useEffect(() => {
    if (localId) getCoffeeShopUploadedBy(localId);
    setDeleteClicked(false);
  }, [emailVerified, deleteClicked]);

  const editProfileHandler = () => setShowEditProfile(true);

  const editProfileCancelHandler = () => setShowEditProfile(false);

  const editPasswordHandler = () => setShowEditPassword(true);

  const editPasswordCancelHandler = () => setShowEditPassword(false);

  const closeVerificationHandler = () => setShowVerification(false);

  const showVerificationHandler = () => setShowVerification(true);

  if (!userData)
    return (
      <div className="spinner">
        <Spinner />
      </div>
    );

  return (
    <div className={classes.ProfilePage}>
      {!showEditProfile && !showEditPassword ? (
        <Profile
          name={name}
          email={email}
          photoURL={photoURL}
          emailVerified={emailVerified}
          showEditProfile={editProfileHandler}
          showEditPassword={editPasswordHandler}
          showVerificationHandler={showVerificationHandler}
        />
      ) : showEditProfile ? (
        <EditProfile
          name={name}
          email={email}
          photoURL={photoURL}
          cancelEditProfile={editProfileCancelHandler}
        />
      ) : showEditPassword ? (
        <EditPassword
          photoURL={photoURL}
          cancelEditPassword={editPasswordCancelHandler}
        />
      ) : null}
      {showVerification ? (
        <VerificationOwner
          show={showVerification}
          close={closeVerificationHandler}
        />
      ) : null}
      {emailVerified ? (
        <MiniLists
          headerList="Your Page"
          coffeeShopList={coffeeShopList}
          showEditableButton
          deleteClicked={setDeleteClicked}
        />
      ) : null}
    </div>
  );
};

export default ProfilePage;
