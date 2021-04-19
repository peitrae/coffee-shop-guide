import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const Spinner = ({ className, color = "primary" }) => (
  <div className={`spinner ${className} spinner--${color}`}>
    <CircularProgress className="circular-progress" />
  </div>
);

export default Spinner;
