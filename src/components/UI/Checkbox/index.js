import React from "react";

const Checkbox = ({ checked, onChange, children, className }) => (
  <label className={`checkbox ${className}`}>
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="checkbox__input"
    />
    {children}
    <span className="checkbox__checkmark"></span>
  </label>
);

export default Checkbox;
