import React, { useContext } from "react";

import { FunctionContext } from "../../../UpdateCoffeeShop";
import { Button } from "../../../../../components/UI/Button/Button";
import DayDropdown from "./DayDropdown/DayDropdown";
import TimePicker from "./TimePicker/TimePicker";

import { ReactComponent as CloseIcon } from "../../../../../assets/svg/close.svg";

import "./OperationalHoursItem.scss";

const OperationalHoursItem = ({
  index,
  day,
  daysOptions,
  open,
  close,
}) => {
  const context = useContext(FunctionContext);
  const { onChangeDay, onSubmitOpen, onSubmitClose, onDeleteDay } = context;

  return (
    <div className="operational-hours-item">
      <DayDropdown
        day={day}
        daysOptions={daysOptions}
        index={index}
        onChange={onChangeDay}
      />
      <TimePicker
        index={index}
        value={open}
        onSubmit={onSubmitOpen}
      />
      <TimePicker
        index={index}
        value={close}
        onSubmit={onSubmitClose}
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
};

export default OperationalHoursItem;
