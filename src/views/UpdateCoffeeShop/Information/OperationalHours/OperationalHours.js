import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import { PlainBtn } from "../../../../components/UI/Button/Button";
import TrashIcon from "../../../../assets/icon/TrashIcon";

import "./OperationalHours.scss";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textFieldDay: {
    width: 130,
  },
  textFieldTimePicker: {
    width: 155,
  },
  menu: {
    width: 150,
  },
}));

const OperationalHours = ({
  operationalHours,
  dayChangeHandler,
  timeChangeHandler,
  deleteDaysClickHandler,
}) => {
  const classesMaterial = useStyles();

  const labels = [
    { value: 0, label: "Sunday" },
    { value: 1, label: "Monday" },
    { value: 2, label: "Tuesday" },
    { value: 3, label: "Wednesday" },
    { value: 4, label: "Thursday" },
    { value: 5, label: "Friday" },
    { value: 6, label: "Saturday" },
  ];

  const choosenDay = operationalHours.map((value) => value.day);

  const timePickerGetValue = (index, type) => {
    const date = new Date();
    const toIntHours = parseInt(operationalHours[index][type].slice(0, 2));
    const toIntMinutes = parseInt(operationalHours[index][type].slice(3, 5));
    date.setHours(toIntHours);
    date.setMinutes(toIntMinutes);
    return date;
  };

  const sortingMenuItem = (filteredDayList, coffeeShopDay) => {
    if (coffeeShopDay) {
      filteredDayList.push(labels[coffeeShopDay]);
      filteredDayList.sort((a, b) => a.value - b.value);
    } else if (coffeeShopDay === 0) {
      filteredDayList.unshift(labels[coffeeShopDay]);
    }
    return filteredDayList;
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div className="add-hours-grp">
        {operationalHours.map((valueDay, index) => {
          const daysLeft = labels.filter(
            ({ value }) => !choosenDay.includes(value)
          );
          const sortedMenuItem = sortingMenuItem(daysLeft, valueDay.day);
          return (
            <div className="add-hours-item" key={index}>
              <TextField
                id="day"
                select
                className={classesMaterial.textFieldDay}
                value={valueDay.day}
                onChange={dayChangeHandler(index)}
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
              <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                label="Open"
                value={timePickerGetValue(index, "open")}
                inputVariant="outlined"
                onChange={timeChangeHandler(index, "open")}
                className={classesMaterial.textFieldTimePicker}
                size="small"
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
              />
              <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                label="Close"
                value={timePickerGetValue(index, "close")}
                inputVariant="outlined"
                onChange={timeChangeHandler(index, "close")}
                className={classesMaterial.textFieldTimePicker}
                size="small"
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
              />
              <PlainBtn
                className="delete-btn"
                onClick={deleteDaysClickHandler(index)}
              >
                <TrashIcon />
              </PlainBtn>
            </div>
          );
        })}
      </div>
    </MuiPickersUtilsProvider>
  );
};

export default React.memo(OperationalHours);
