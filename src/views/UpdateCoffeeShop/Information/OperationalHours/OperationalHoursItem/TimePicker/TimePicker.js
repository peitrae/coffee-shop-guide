import React, { useState, useRef } from "react";
import moment from "moment";
import {
  TimePicker as MaterialTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import DateFnsUtils from "@date-io/date-fns";

import InputField from "../../../../../../components/UI/InputField/InputField";
import { Button } from "../../../../../../components/UI/Button/Button";
import useClickOutside from "../../../../../../hooks/useClickOutside";

import { ReactComponent as ClockIcon } from "../../../../../../assets/svg/clock.svg";

import "./TimePicker.scss";

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

const TimePicker = ({ index, value, onSubmit }) => {
  const timepickerRef = useRef();
  const date = new Date();

  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(date);
  const [inputError, setInputError] = useState(false);

  useClickOutside(timepickerRef, () => {
    setShowTimePicker(false);
  });

  const onClickTime = (e) => {
    e.preventDefault();
    setShowTimePicker(true);
  };

  const onChangeInput = (e) => {
    const string = e.target.value;
    const regex = /([01]?[0-9]|2[0-3]):[0-5][0-9]/;

    if (string.length > 5) {
      return null;
    }

    if (regex.test(string)) {
      setInputError(false);
    } else {
      setInputError(true);
    }
 
    onSubmit(string, index);
  };

  const onClickSubmitTimePicker = (e) => {
    e.preventDefault();

    const hourMinute = moment(selectedTime).format("HH:mm");
    onSubmit(hourMinute, index);
    setShowTimePicker(false);
  };

  const onClickCancelTimePicker = (e) => {
    e.preventDefault();
    setShowTimePicker(false);
  };

  return (
    <div className="timepicker">
      <InputField
        value={value ? value : "00:00"}
        onChange={onChangeInput}
        size="sm"
        className={`timepicker-input`}
        danger={inputError}
        rightIcon={<ClockIcon />}
        rightOnClick={onClickTime}
      />
      {showTimePicker ? (
        <div className="timepicker-container" ref={timepickerRef}>
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
          <div className="timepicker-controls">
            <Button type="text" onClick={onClickCancelTimePicker}>
              Cancel
            </Button>
            <Button type="text" onClick={onClickSubmitTimePicker}>
              OK
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default TimePicker;
