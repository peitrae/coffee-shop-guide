import React, { forwardRef } from "react";

import "./Dropdown.scss";

export const DropdownMenu = forwardRef(
  ({ className, children, style }, ref) => (
    <div ref={ref} className={`dropdown-menu ${className}`} style={style}>
      {children}
    </div>
  )
);

export const DropdownItem = ({
  className,
  leftIcon,
  rightIcon,
  children,
  onClick,
}) => (
  <button className={`dropdown-item ${className}`} onClick={onClick}>
    <span className="left-icon">{leftIcon}</span>
    {children}
    <span className="right-icon">{rightIcon}</span>
  </button>
);

export default DropdownMenu;
