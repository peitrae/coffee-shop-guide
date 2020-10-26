import React, { useState } from "react";
import { useSelector } from "react-redux";

import Profile from "./Profile/Profile";
import EditProfile from "./EditProfile/EditProfile";
import EditPassword from "./EditPassword/EditPassword";
import SendVerification from "./SendVerification/SendVerification";
import CoffeeShopList from "./CoffeeShopList/CoffeeShopList";
import BookmarkList from "./BookmarkList/BookmarkList";
import Spinner from "../../components/UI/Spinner/Spinner";
import Footer from "../../components/UI/Footer/Footer";

import "./ProfilePage.scss";

const ProfilePage = () => {
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showEditPassword, setShowEditPassword] = useState(false);
  const [showVerification, setShowVerification] = useState(false);

  const { localId, emailVerified } = useSelector((state) => state.member);

  const showEditProfileHandler = () => setShowEditProfile(!showEditProfile);

  const showEditPasswordHandler = () => setShowEditPassword(!showEditPassword);

  const showVerificationHandler = () => setShowVerification(!showVerification);

  if (!localId) {
    return <Spinner />;
  }

  return (
    <>
      <div className="profile-page">
        {!showEditProfile && !showEditPassword ? (
          <Profile
            showEditProfileHandler={showEditProfileHandler}
            showEditPasswordHandler={showEditPasswordHandler}
            showVerificationHandler={showVerificationHandler}
          />
        ) : showEditProfile ? (
          <EditProfile cancelEditProfile={showEditProfileHandler} />
        ) : showEditPassword ? (
          <EditPassword cancelEditPassword={showEditPasswordHandler} />
        ) : null}
        {showVerification ? (
          <SendVerification
            show={showVerification}
            close={showVerificationHandler}
          />
        ) : null}
        {emailVerified ? <CoffeeShopList /> : null}
        <BookmarkList />
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;
