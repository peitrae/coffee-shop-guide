import React from "react";

import "./InputField.scss";

const InputField = ({
  className,
  value,
  placeholder,
  type = "text",
  size = "sm",
  onChange,
  rightIcon,
  rightOnClick,
  danger
}) => (
  <div className={`input-field ${className} ${danger ? "danger" : ""}`}>
    <input
      className={size}
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
    />
    {rightIcon ? (
      <button className={`right-icon ${size}`} onClick={rightOnClick}>
        {rightIcon}
      </button>
    ) : null}
  </div>
);

export default InputField;
