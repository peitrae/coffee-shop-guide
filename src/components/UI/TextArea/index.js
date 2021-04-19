import React from "react";

const TextArea = ({ className, placeholder, value, onChange }) => (
  <textarea
    className={`textarea ${className}`}
    placeholder={placeholder}
    onChange={onChange}
    value={value}
  ></textarea>
);

export default TextArea;
