import React, { forwardRef } from "react";

import "./Dropdown.scss";

const Dropdown = ({
  value,
  children,
  className,
  size = "sm",
  placeholder,
  onClick,
}) => {
  return (
    <div className={`dropdown ${size} ${className}`}>
      <input
        className="dropdown-input"
        value={value}
        size={size}
        placeholder={placeholder}
        readOnly
        onClick={onClick}
      />
      {children}
    </div>
  );
};

export const DropdownMenu = forwardRef(
  ({ className, children, style }, ref) => (
    <div ref={ref} className={`dropdown-menu ${className}`} style={style}>
      {children}
    </div>
  )
);

export const DropdownItem = ({
  id,
  className,
  leftIcon,
  rightIcon,
  children,
  onClick,
}) => (
  <button id={id} className={`dropdown-item ${className}`} onClick={onClick}>
    {leftIcon ? <span className="left-icon">{leftIcon}</span> : null}
    {children}
    {rightIcon ? <span className="right-icon">{rightIcon}</span> : null}
  </button>
);

export default Dropdown;
