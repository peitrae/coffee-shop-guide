import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import Profile from './Profile/Profile';
import EditProfile from './EditProfile/EditProfile';
import EditPassword from './EditPassword/EditPassword';
import SendVerification from './SendVerification/SendVerification';
import CoffeeShopList from './CoffeeShopList/CoffeeShopList';
import BookmarkList from './BookmarkList/BookmarkList';
import Spinner from '../../components/UI/Spinner/Spinner';
import Footer from '../../components/UI/Footer/Footer';
import classes from './ProfilePage.module.css';

const ProfilePage = () => {
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showEditPassword, setShowEditPassword] = useState(false);
  const [showVerification, setShowVerification] = useState(false);

  const { localId, emailVerified, name, email, photoUrl } = useSelector(
    (state) => state.member
  );

  const editProfileHandler = () => setShowEditProfile(true);

  const editProfileCancelHandler = () => {
    setShowEditProfile(false);
  };

  const editPasswordHandler = () => setShowEditPassword(true);

  const editPasswordCancelHandler = () => setShowEditPassword(false);

  const closeVerificationHandler = () => setShowVerification(false);

  const showVerificationHandler = () => setShowVerification(true);

  if (!localId) return <Spinner />;

  return (
    <React.Fragment>
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
          <EditProfile cancelEditProfile={editProfileCancelHandler} />
        ) : showEditPassword ? (
          <EditPassword
            photoUrl={photoUrl}
            cancelEditPassword={editPasswordCancelHandler}
          />
        ) : null}
        {showVerification ? (
          <SendVerification
            show={showVerification}
            close={closeVerificationHandler}
          />
        ) : null}
        {emailVerified ? <CoffeeShopList localId={localId} /> : null}
        <BookmarkList />
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default ProfilePage;
