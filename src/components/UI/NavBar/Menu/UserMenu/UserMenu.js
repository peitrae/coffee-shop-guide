import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import BubbleBox from "../../../BubbleBox/BubbleBox";
import * as actions from "../../../../../store/actions/member";

import "./UserMenu.scss";

const UserMenu = ({ closeHandler }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { name, emailVerified } = useSelector((state) => state.member);

  const logoutClickHandler = () => {
    dispatch(actions.logout());
    closeHandler();
    history.push("/");
  };

  return (
    <BubbleBox pos="left" className="user-menu" onClickOutside={closeHandler}>
      <div className="user-menu-profile">
        <span className="user-name">{name}</span>
        <span className="user-status">
          {emailVerified ? "Owner" : "Member"}
        </span>
      </div>
      <hr className="user-menu-separator" />
      <div className="user-menu-grp">
        <NavLink
          to="/profile"
          className="user-menu-item"
          onClick={closeHandler}
        >
          Profile
        </NavLink>
        <button className="user-menu-item" onClick={logoutClickHandler}>
          Logout
        </button>
      </div>
    </BubbleBox>
  );
};

export default UserMenu;
