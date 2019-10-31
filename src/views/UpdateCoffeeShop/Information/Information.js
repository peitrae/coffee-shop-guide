import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import MenuItem from "@material-ui/core/MenuItem";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import Card from "../../../components//UI/Card/Card";
import classes from "./Information.module.css";
import { BtnSmall } from "../../../components/UI/Button/Button";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textFieldHalf: {
    width: 300
  },
  textFieldDay: {
    width: 130
  },
  textFieldTimePicker: {
    width: 150
  },
  menu: {
    width: 150
  }
}));

const Information = props => {
  const classesMaterial = useStyles();

  const { state, setState } = props
  const {
    averagePrice,
    contact,
    facilities,
    operationalHours
  } = state;

  const dayList = [
    { value: 0, label: "Sunday" },
    { value: 1, label: "Monday" },
    { value: 2, label: "Tuesday" },
    { value: 3, label: "Wednesday" },
    { value: 4, label: "Thursday" },
    { value: 5, label: "Friday" },
    { value: 6, label: "Saturday" },
  ];

  const sameDay = [];
  dayList.forEach(day => {
    operationalHours.forEach(operationalDay => {
      if (day.value === operationalDay.day) {
        sameDay.push(day.value);
      }
    });
  });

  const filteredDayList = dayList.filter(day => !sameDay.includes(day.value));

  const inputChangeHandler = type => event => {
    setState({ ...state, [type]: event.target.value });
  };

  const facilitiesChangeHandler = index => event => {
    const tempEdit = [...state.facilities];
    tempEdit[index] = event.target.value;
    setState({ ...state, facilities: tempEdit });
  };

  const dayChangeHandler = index => event => {
    const tempEdit = [...state.operationalHours];
    tempEdit[index].day = event.target.value;
    setState({ ...state, operationalHours: tempEdit });
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

  const addFacilitiesHandler = event => {
    event.preventDefault();
    const tempAdd = [...state.facilities];
    tempAdd.push("");
    setState({ ...state, facilities: tempAdd });
  };

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

  const deleteButtonHandler = (type, index) => {
    const tempDelete = [...state[type]];
    tempDelete.splice(index, 1);
    setState({ ...state, [type]: tempDelete });
  };

  const sortingMenuItem = (filteredDayList, coffeeShopDay) => {
    if (coffeeShopDay) {
      filteredDayList.push(dayList[coffeeShopDay]);
      filteredDayList.sort((a, b) => a.value - b.value);
    } else if (coffeeShopDay === 0) {
      filteredDayList.unshift(dayList[coffeeShopDay]);
    } 
    return filteredDayList
  }

  return (
    <Card cardType={classes.Card}>
      <h2>Information</h2>
      <div>
        <div>
          <table>
            <tbody>
              <tr>
                <th>Average Price</th>
                <td className={classes.TablePaddingHelper}>
                  <TextField
                    id="averagePrice"
                    className={classesMaterial.textFieldHalf}
                    placeholder="Average Price"
                    value={averagePrice}
                    onChange={inputChangeHandler("averagePrice")}
                    margin="normal"
                    type="number"
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">Rp</InputAdornment>
                      )
                    }}
                  />
                </td>
              </tr>
              <tr>
                <th>Contact</th>
                <td className={classes.TablePaddingHelper}>
                  <TextField
                    id="contact"
                    placeholder="Contact"
                    className={classesMaterial.textFieldHalf}
                    value={contact}
                    onChange={inputChangeHandler("contact")}
                    margin="normal"
                    type="number"
                    variant="outlined"
                  />
                </td>
              </tr>
              <tr>
                <th>Amenities</th>
                <td>
                  <table>
                    <tbody>
                      {facilities.map((facility, index) => (
                        <tr key={index}>
                          <td>
                            <TextField
                              id="facilities"
                              placeholder="Facilities"
                              className={classesMaterial.textFieldHalf}
                              value={facility}
                              onChange={facilitiesChangeHandler(index)}
                              margin="normal"
                              variant="outlined"
                            />
                          </td>
                          <td className={classes.ButtonPaddingHelper}>
                            <BtnSmall
                              btnName="Delete"
                              btnType="Danger"
                              clicked={() =>
                                deleteButtonHandler("facilities", index)
                              }
                            />
                          </td>
                        </tr>
                      ))}
                      <tr>
                        <td>
                          <BtnSmall
                            btnName="Add More"
                            clicked={addFacilitiesHandler}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <th>Operational Hours</th>
                <td>
                  <table>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <tbody>
                        {operationalHours.map((valueDay, index) => {
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
                                      className: classes.menu
                                    }
                                  }}
                                >
                                  {sortedMenuItem.map(option => {
                                    return (
                                      <MenuItem
                                        key={option.value}
                                        value={option.value}
                                      >
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
                                  className={
                                    classesMaterial.textFieldTimePicker
                                  }
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
                                  className={
                                    classesMaterial.textFieldTimePicker
                                  }
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
                                    deleteButtonHandler(
                                      "operationalHours",
                                      index
                                    )
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
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
};

export default Information;
