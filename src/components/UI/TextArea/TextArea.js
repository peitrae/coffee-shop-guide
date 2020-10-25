import React from "react";

import "./TextArea.scss";

const TextArea = ({ className, placeholder, value, onChange }) => (
  <textarea
    className={`textarea ${className}`}
    placeholder={placeholder}
    onChange={onChange}
    value={value}
  ></textarea>
);

export default TextArea;
