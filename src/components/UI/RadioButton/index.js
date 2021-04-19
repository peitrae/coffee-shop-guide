import React from "react";

const RadioButton = ({
  name,
  value,
  onClick,
  checked,
  children,
  className = "",
}) => (
  <label className={`radio-btn  ${className}`}>
    <input
      type="radio"
      name={name}
      className="radio-btn__input"
      value={value}
      readOnly
      onClick={onClick}
      checked={checked}
    />
    <div className="radio-btn__checkmark">
      <div className="radio-btn__label">{children}</div>
    </div>
  </label>
);

export default RadioButton;
