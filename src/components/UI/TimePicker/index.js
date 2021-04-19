import React, { useState, useRef } from "react";
import moment from "moment";
import {
  TimePicker as MaterialTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import DateFnsUtils from "@date-io/date-fns";

import { Button } from "../Button";
import useClickOutside from "../../../hooks/useClickOutside";

const materialTheme = createMuiTheme({
  overrides: {
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: "#219653",
      },
    },
    MuiPickersClockPointer: {
      pointer: {
        backgroundColor: "#219653",
      },
    },
    MuiPickersClock: {
      pin: {
        backgroundColor: "#219653",
      },
    },
    MuiPickersClockNumber: {
      clockNumberSelected: {
        backgroundColor: "#219653",
      },
    },
  },
});

const TimePicker = ({
  handleClose: handleCloseTimePicker = () => {},
  handleSubmit: handleSubmitTimePicker = () => {},
  className,
}) => {
  const timepickerRef = useRef();
  const date = new Date();

  const [selectedTime, setSelectedTime] = useState(date);

  useClickOutside(timepickerRef, () => {
    handleCloseTimePicker();
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const hourMinute = moment(selectedTime).format("HH:mm");
    handleSubmitTimePicker(hourMinute);
  };

  const handleClose = (e) => {
    e.preventDefault();
    handleCloseTimePicker();
  };

  return (
    <div className={`timepicker ${className}`} ref={timepickerRef}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <ThemeProvider theme={materialTheme}>
          <MaterialTimePicker
            autoOk
            variant="static"
            format="HH:mm"
            openTo="hours"
            value={selectedTime}
            onChange={setSelectedTime}
          />
        </ThemeProvider>
      </MuiPickersUtilsProvider>
      <div className="timepicker__actions">
        <Button type="text" onClick={handleClose}>
          Cancel
        </Button>
        <Button type="text" onClick={handleSubmit}>
          OK
        </Button>
      </div>
    </div>
  );
};

export default TimePicker;
