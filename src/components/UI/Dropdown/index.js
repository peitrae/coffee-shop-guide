import React, { forwardRef } from "react";

const Dropdown = ({
  value,
  children,
  className,
  size = "sm",
  placeholder,
  onClick,
}) => {
  return (
    <div className={`dropdown dropdown--${size} ${className}`}>
      <input
        className="dropdown__input"
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

export const DropdownSection = ({ children }) => (
  <div className="dropdown__section">{children}</div>
);

export const DropdownSeparator = () => <hr className="dropdown__separator" />;

export const DropdownMenu = forwardRef(
  ({ className, children, style }, ref) => (
    <div ref={ref} className={`dropdown__menu ${className}`} style={style}>
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
  <button id={id} className={`dropdown__item ${className}`} onClick={onClick}>
    {leftIcon ? (
      <span className="dropdown__icon dropdown__icon--left">{leftIcon}</span>
    ) : null}
    {children}
    {rightIcon ? (
      <span className="dropdown__icon dropdown__icon--right">{rightIcon}</span>
    ) : null}
  </button>
);

export default Dropdown;
