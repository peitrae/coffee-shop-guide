import React, { useContext, useMemo } from "react";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import { Button } from "../../../../components/UI/Button/Button";
import { ReactComponent as CloseIcon } from "../../../../assets/svg/close.svg";
import { FunctionContext } from "../../UpdateCoffeeShop";
import DayInput from "./DayInput/DayInput";
import TimePicker from "./TimePicker/TimePicker";

import { ReactComponent as PlusIcon } from "../../../../assets/svg/plus.svg";

import "./OperationalHours.scss";

const OperationalHours = ({ operationalHours }) => {
  const context = useContext(FunctionContext);
  const { onChangeDay, onChangeTime, onAddDays, onDeleteDay } = context;

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

  return useMemo(
    () => (
      <div className="operational-hours">
        <label className="information-label">Operational Hours</label>
        <div className="operational-hours-container">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            {operationalHours.map((valueDay, index) => {
              const daysLeft = labels.filter(
                ({ value }) => !choosenDay.includes(value)
              );
              const sortedMenuItem = sortingMenuItem(daysLeft, valueDay.day);
              return (
                <div className="operational-hours-item" key={index}>
                  <DayInput
                    value={valueDay.day}
                    sortedMenuItem={sortedMenuItem}
                    onChange={onChangeDay(index)}
                  />
                  <TimePicker
                    label="Open"
                    value={timePickerGetValue(index, "open")}
                    onChange={onChangeTime(index, "open")}
                  />
                  <TimePicker
                    label="Open"
                    value={timePickerGetValue(index, "close")}
                    onChange={onChangeTime(index, "close")}
                  />
                  <Button
                    size="sm"
                    type="text"
                    className="delete-button"
                    onClick={onDeleteDay(index)}
                    icon={CloseIcon}
                  />
                </div>
              );
            })}
          </MuiPickersUtilsProvider>
          <Button
            size="sm"
            type="text"
            className="add-button"
            onClick={onAddDays}
            icon={PlusIcon}
          >
            Add days
          </Button>
        </div>
      </div>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [operationalHours]
  );
};

export default OperationalHours;
