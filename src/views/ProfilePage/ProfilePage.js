import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";

import Profile from "../../components/Profile/Profile";
import classes from "./ProfilePage.module.css";
import MiniLists from "../../components/MiniLists/MiniLists";

const ProfilePage = () => {
  const [deleteClicked, setDeleteClicked] = useState(false)

  const userId = useSelector(state => state.member.localId);
  const emailVerified = useSelector(state => state.member.emailVerified);
  const coffeeShopListByUser = useSelector(
    state => state.member.coffeeShopList
  );

  const dispatch = useDispatch();
  const getCoffeeShopUploadedBy = useCallback(
    userId => dispatch(actions.getCoffeeShopUploadedBy(userId)),
    [dispatch]
  );

  useEffect(() => {
    if (userId) getCoffeeShopUploadedBy(userId);
    setDeleteClicked(false)
  }, [emailVerified, deleteClicked]); // Not render after delete

  console.log(deleteClicked)

  return (
    <div className={classes.ProfilePage}>
      <Profile />
      {!emailVerified ? (
        <MiniLists
          headerList="Halaman Kamu"
          coffeeShopList={coffeeShopListByUser}
          showEditableButton
          deleteClicked={setDeleteClicked}
        />
      ) : null}
    </div>
  );
};

export default ProfilePage;
