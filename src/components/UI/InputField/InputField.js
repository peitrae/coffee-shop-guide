import React from "react";

const InputField = ({
  className,
  id,
  name,
  value,
  placeholder,
  type = "text",
  size = "md",
  onChange,
  rightIcon,
  rightOnClick,
  danger,
  disabled,
}) => (
  <div
    className={`input-field ${className} 
      input-field--${size} 
      ${danger ? "danger" : ""} 
      ${rightIcon ? "input-field--has-right-icon" : ""}
      ${disabled ? "input-field--disabled" : ""}`}
  >
    <input
      id={id}
      name={name}
      className={`input-field__input ${size}`}
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
    />
    {rightIcon ? (
      <button
        className={`input-field__right-icon ${size}`}
        onClick={rightOnClick}
      >
        {rightIcon}
      </button>
    ) : null}
  </div>
);

export default InputField;
