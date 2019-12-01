import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

import classes from "./CircularProgress.module.css";

const ColorCircularProgress = withStyles({
  root: {
    color: "#fafafa"
  }
})(CircularProgress);

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  }
}));

const Progress = props => {
  const classesMaterial = useStyles();
  return (
    <div className={classes.Progress}>
      <div className={classesMaterial.root}>
        <ColorCircularProgress size={50} thickness={5} />
      </div>
    </div>
  );
};

export default Progress;
