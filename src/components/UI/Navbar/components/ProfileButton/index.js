import React, { forwardRef } from "react";
import UserIcon from "../../../../../assets/icon/UserIcon";

const ProfileButton = forwardRef(({ onClick }, ref) => (
  <button ref={ref} onClick={onClick} className="navbar__profile-btn">
    <UserIcon />
  </button>
));

export default ProfileButton;
