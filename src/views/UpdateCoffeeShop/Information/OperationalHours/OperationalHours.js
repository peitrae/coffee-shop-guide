import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import { BtnSmall } from "../../../../components/UI/Button/Button";
import classes from "./OperationalHours.module.css";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textFieldDay: {
    width: 130
  },
  textFieldTimePicker: {
    width: 160
  },
  menu: {
    width: 150
  }
}));

const OperationalHours = props => {
  const classesMaterial = useStyles();

  const { state, setState, deleteHandler} = props;
  const { operationalHours } = state;

  const dayReducer = [
    { value: 0, label: "Sunday" },
    { value: 1, label: "Monday" },
    { value: 2, label: "Tuesday" },
    { value: 3, label: "Wednesday" },
    { value: 4, label: "Thursday" },
    { value: 5, label: "Friday" },
    { value: 6, label: "Saturday" },
  ];

  const choosenDay = operationalHours.map(value => value.day);

  const dayChangeHandler = index => event => {
    let temp = [...state.operationalHours];
    temp[index].day = event.target.value;
    temp = temp.sort((a, b) => a.day - b.day)
    setState({ ...state, operationalHours: temp });
  };

  const timeChangeHandler = (index, type) => event => {
    const tempEdit = [...state.operationalHours];
    let toStringHours = event.getHours().toString();
    let toStringMinutes = event.getMinutes().toString();
    
    if (toStringHours.length === 1) toStringHours = `0${toStringHours}`;
    if (toStringMinutes.length === 1) toStringMinutes = `0${toStringMinutes}`;

    tempEdit[index][type] = `${toStringHours}:${toStringMinutes}`;
    setState({ ...state, operationalHours: tempEdit });
  };

  const timePickerGetValue = (index, type) => {
    const tempDate = new Date();
    const toIntHours = parseInt(operationalHours[index][type].slice(0, 2));
    const toIntMinutes = parseInt(operationalHours[index][type].slice(3, 5));
    tempDate.setHours(toIntHours);
    tempDate.setMinutes(toIntMinutes);
    return tempDate;
  };

  const sortingMenuItem = (filteredDayList, coffeeShopDay) => {
    if (coffeeShopDay) {
      filteredDayList.push(dayReducer[coffeeShopDay]);
      filteredDayList.sort((a, b) => a.value - b.value);
    } else if (coffeeShopDay === 0) {
      filteredDayList.unshift(dayReducer[coffeeShopDay]);
    } 
    return filteredDayList
  }

  const addOperationalHoursHandler = event => {
    event.preventDefault();
    const tempAdd = [...state.operationalHours];
    tempAdd.push({
      close: "00:00",
      day: "",
      open: "00:00"
    });
    setState({ ...state, operationalHours: tempAdd });
  };

  return (
    <tr>
      <th>Operational Hours</th>
      <td>
        <table>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <tbody>
              {operationalHours.map((valueDay, index) => {
                const filteredDayList = dayReducer.filter(day => !choosenDay.includes(day.value));
                const sortedMenuItem = sortingMenuItem(filteredDayList, valueDay.day);
                return (
                  <tr key={index}>
                    <td>
                      <TextField
                        id="day"
                        select
                        className={classesMaterial.textFieldDay}
                        value={valueDay.day}
                        onChange={dayChangeHandler(index)}
                        margin="normal"
                        variant="outlined"
                        label="Day"
                        SelectProps={{
                          MenuProps: {
                            className: classesMaterial.menu
                          }
                        }}
                      >
                        {sortedMenuItem.map(option => {
                          return (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          );
                        })}
                      </TextField>
                    </td>
                    <td>
                      <KeyboardTimePicker
                        margin="normal"
                        id="time-picker"
                        label="Open"
                        value={timePickerGetValue(index, "open")}
                        inputVariant="outlined"
                        onChange={timeChangeHandler(index, "open")}
                        className={classesMaterial.textFieldTimePicker}
                        KeyboardButtonProps={{
                          "aria-label": "change time"
                        }}
                      />
                    </td>
                    <td>
                      <KeyboardTimePicker
                        margin="normal"
                        id="time-picker"
                        label="Close"
                        value={timePickerGetValue(index, "close")}
                        inputVariant="outlined"
                        onChange={timeChangeHandler(index, "close")}
                        className={classesMaterial.textFieldTimePicker}
                        KeyboardButtonProps={{
                          "aria-label": "change time"
                        }}
                      />
                    </td>
                    <td className={classes.ButtonPaddingHelper}>
                      <BtnSmall
                        btnName="Delete"
                        btnType="Danger"
                        clicked={() =>
                          deleteHandler("operationalHours", index)
                        }
                      />
                    </td>
                  </tr>
                );
              })}
              <tr>
                <td>
                  {operationalHours.length < 7 ? (
                    <BtnSmall
                      btnName="Add More"
                      clicked={addOperationalHoursHandler}
                    />
                  ) : null}
                </td>
              </tr>
            </tbody>
          </MuiPickersUtilsProvider>
        </table>
      </td>
    </tr>
  );
};

export default OperationalHours;
