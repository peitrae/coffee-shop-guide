import React from "react";

import "./InputField.scss";

const InputField = ({
  className,
  value,
  placeholder,
  type = "text",
  size = "sm",
  onChange,
}) => (
  <input
    className={`input-field ${size} ${className}`}
    value={value}
    onChange={onChange}
    type={type}
    placeholder={placeholder}
  />
);

export default InputField;
