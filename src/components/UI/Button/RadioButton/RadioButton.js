import React from "react";

import "./RadioButton.scss";

const RadioButton = ({
  name,
  value,
  onClick,
  checked,
  size,
  children,
  className,
}) => (
  <label className={`radio-btn radio-btn-${size} ${className}`}>
    <input
      type="radio"
      name={name}
      className="radio-btn-input"
      value={value}
      readOnly
      onClick={onClick}
      checked={checked}
    />
    <div className="radio-btn-checkmark">
      <div>{children}</div>
    </div>
  </label>
);

export default RadioButton;
