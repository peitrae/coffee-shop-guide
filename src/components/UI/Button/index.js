import React, { forwardRef } from "react";
import { ReactComponent as CloseIcon } from "../../../assets/svg/close.svg";

export const Button = forwardRef(
  (
    {
      icon: Icon,
      type = "solid",
      color = "primary",
      size = "md",
      children,
      className = "",
      onClick,
      disabled,
    },
    ref
  ) => (
    <button
      className={`btn btn--${type}-${disabled ? "disabled" : color} 
      btn--${size} ${className}`}
      onClick={onClick}
      ref={ref}
      disabled={disabled}
    >
      {Icon ? <Icon className="btn--append" /> : null}
      {children}
    </button>
  )
);

export const CloseCircleButton = ({ onClick, className = "" }) => (
  <button className={`btn-close ${className}`} onClick={onClick}>
    <CloseIcon />
  </button>
);

export const PlainBtn = forwardRef(({ children, className, onClick }, ref) => (
  <button ref={ref} className={`btn-text ${className}`} onClick={onClick}>
    {children}
  </button>
));

export default Button;
