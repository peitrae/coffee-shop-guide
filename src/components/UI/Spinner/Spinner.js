import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

import "./Spinner.scss";

const Spinner = ({className}) => (
  <div className={`spinner ${className}`}>
    <CircularProgress className="circular-progress"/>
  </div>
)

export default Spinner;
