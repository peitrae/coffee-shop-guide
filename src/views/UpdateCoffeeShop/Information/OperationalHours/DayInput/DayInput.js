import React from "react";

import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  textField: {
    width: 130,
  },
  menu: {
    width: 150,
  },
}));

const DayInput = ({value, sortedMenuItem, onChange}) => {
  const classesMaterial = useStyles();

  return (
  <TextField
    id="day"
    select
    className={classesMaterial.textField}
    value={value}
    onChange={onChange}
    margin="normal"
    variant="outlined"
    label="Day"
    size="small"
    SelectProps={{
      MenuProps: {
        className: classesMaterial.menu,
      },
    }}
  >
    {sortedMenuItem.map((option) => {
      return (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      );
    })}
  </TextField>
)};

export default DayInput;
