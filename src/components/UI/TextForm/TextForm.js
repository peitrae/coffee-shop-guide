import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  "textField-3": {
    width: 300
  }
}));

const TextForm = props => {
  const {
    id,
    label,
    className,
    type,
    value,
    inputHandler
  } = props;

  const classes = useStyles();

  return (
    <TextField
      id={id}
      label={label}
      className={classes[className]}
      type={type}
      value={value}
      onChange={inputHandler}
      margin="normal"
      variant="outlined"
    />
  );
};

export default TextForm;
