import React from "react";
import { KeyboardTimePicker } from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  timePicker: {
    width: 155,
    fontSize: '14px'
  },
}));

const TimePicker = ({label, value, onChange}) => {
  const classesMaterial = useStyles();

  return (
    <KeyboardTimePicker
      margin="normal"
      id="time-picker"
      label={label}
      value={value}
      inputVariant="outlined"
      onChange={onChange}
      className={classesMaterial.timePicker}
      size="small"
      KeyboardButtonProps={{
        "aria-label": "change time",
      }}
    />
  );
};

export default TimePicker;
