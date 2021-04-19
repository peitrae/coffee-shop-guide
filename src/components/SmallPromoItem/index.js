import React from "react";

const Promo = ({ children, className }) => (
  <div className={`small-promo-item ${className}`}>{children}</div>
);

export default Promo;
