import React from "react";

const Card = ({ shadow, children, className }) => (
  <div className={`card ${shadow ? "card--shadow" : ""} ${className}`}>
    {children}
  </div>
);

export default Card;
