import React, { useState, useRef } from "react";

import InputField from "../../../../../../../../../../components/UI/InputField/InputField";
import useClickOutside from "../../../../../../../../../../hooks/useClickOutside";
import TimePicker from "../../../../../../../../../../components/UI/TimePicker";

import { ReactComponent as ClockIcon } from "../../../../../../../../../../assets/svg/clock.svg";

const InputTime = ({
  index,
  value,
  handleSubmit = () => {},
  handleError = () => {},
}) => {
  const timepickerRef = useRef();

  const [showTimePicker, setShowTimePicker] = useState(false);
  const [inputError, setInputError] = useState(false);

  useClickOutside(timepickerRef, () => {
    setShowTimePicker(false);
  });

  const handleClickTime = (e) => {
    e.preventDefault();
    setShowTimePicker(true);
  };

  const handleChangeInput = (e) => {
    const string = e.target.value;
    const regex = /([01]?[0-9]|2[0-3]):[0-5][0-9]/;

    if (string.length > 5) {
      return null;
    }

    if (regex.test(string)) {
      setInputError(false);
      handleError({ timepicker: false });
    } else {
      setInputError(true);
      handleError({ timepicker: "Your time format is incorrect" });
    }

    handleSubmit(string, index);
  };

  const handleSubmitTimePicker = (time) => {
    console.log("Time", time)

    handleSubmit(time, index);
    setShowTimePicker(false);
  };

  const handleCloseTimePicker = () => setShowTimePicker(false);

  return (
    <div className="input-time">
      <InputField
        value={value ? value : "00:00"}
        onChange={handleChangeInput}
        size="sm"
        className="input-time__input"
        danger={inputError}
        rightIcon={<ClockIcon />}
        rightOnClick={handleClickTime}
      />
      {showTimePicker ? (
        <TimePicker
          className="input-time__timepicker"
          handleSubmit={handleSubmitTimePicker}
          handleClose={handleCloseTimePicker}
        />
      ) : null}
    </div>
  );
};

export default InputTime;
