import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import classes from "./Spinner.module.css";

// const Spinner = () => (
//   <div className={classes.Spinner}>
//     <div className={classes.Loader}>Loading...</div>
//   </div>
// );

const Spinner = () => (
  <div className={classes.Wrapper}>
    <CircularProgress className={classes.Spinner}/>
  </div>
)

export default Spinner;
