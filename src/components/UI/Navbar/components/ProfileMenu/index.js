import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import BubbleBox from "../../../BubbleBox";
import * as actions from "../../../../../store/actions/member";

const ProfileMenu = ({ handleClose }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { name, emailVerified } = useSelector(({ member }) => member);

  const handleLogout = () => {
    dispatch(actions.logout());
    handleClose();
    history.push("/");
  };

  return (
    <BubbleBox
      align="left"
      className="profile-menu"
      onClickOutside={handleClose}
    >
      <div className="row profile-menu__user">
        <span className="profile-menu__name">{name}</span>
        <span className="profile-menu__status">
          {emailVerified ? "Owner" : "Member"}
        </span>
      </div>
      <div className="profile-menu__separator" />
      <div className="row">
        <NavLink
          to="/profile"
          className="profile-menu__link"
          onClick={handleClose}
        >
          Profil
        </NavLink>
        <button className="profile-menu__link" onClick={handleLogout}>
          Keluar
        </button>
      </div>
    </BubbleBox>
  );
};

export default ProfileMenu;
