import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";

import Profile from "../../components/Profile/Profile";
import VerificationOwner from "./VerificationOwner/VerificationOwner"
import Spinner from "../../components/UI/Spinner/Spinner";
import MiniLists from "../../components/MiniLists/MiniLists";
import classes from "./ProfilePage.module.css";

const ProfilePage = () => {
  const [deleteClicked, setDeleteClicked] = useState(false);
  const [showVerification, setShowVerification] = useState(false);

  const userData = useSelector(state => state.member)
  const { localId, emailVerified, coffeeShopList } = userData;

  const dispatch = useDispatch();
  const getCoffeeShopUploadedBy = useCallback(
    localId => dispatch(actions.getCoffeeShopUploadedBy(localId)),
    [dispatch]
  );

  useEffect(() => {
    if (localId) getCoffeeShopUploadedBy(localId);
    setDeleteClicked(false);
  }, [emailVerified, deleteClicked]); // Not render after delete

  const closeVerificationHandler = () => setShowVerification(false)

  const showVerificationHandler = () => setShowVerification(true)

  if (!userData)
    return (
      <div className="spinner">
        <Spinner />
      </div>
    );
    console.log("userData", userData)

  return (
    <div className={classes.ProfilePage}>
      <Profile
        showVerificationHandler={showVerificationHandler}
      />
      {showVerification ? <VerificationOwner show={showVerification}  close={closeVerificationHandler}/> : null}
      { emailVerified ? (
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
