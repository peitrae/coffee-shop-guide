import React from "react";

const Backdrop = ({ children, className, onClick = () => {} }) => (
  <div className={`backdrop ${className}`} onClick={onClick}>
    {children}
  </div>
);

export default Backdrop;
