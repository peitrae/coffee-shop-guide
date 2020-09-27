import React, { forwardRef } from "react";
import UserIcon from "../../../../../assets/icon/UserIcon";

import "./User.scss";

const User = forwardRef(({ onClick }, ref) => (
  <button ref={ref} onClick={onClick} className="navbar-user-btn">
    <UserIcon />
  </button>
));

export default User;
