import React, { useContext } from "react";

import { FunctionContext } from "../../../../../..";
import { CloseCircleButton } from "../../../../../../../../components/UI/Button";
import DayDropdown from "./components/DayDropdown";
import InputTime from "./components/InputTime";

const OperationalHoursItem = ({
  index,
  item: { day, open, close },
  daysOptions,
}) => {
  const {
    handleDayChange,
    handleSubmitOpen,
    handleSubmitClose,
    handleDayDelete,
    handleError,
  } = useContext(FunctionContext);

  return (
    <div className="operational-hours__item margin-b-8">
      <div className="margin-r-12 width-25">
        <DayDropdown
          day={day}
          daysOptions={daysOptions}
          index={index}
          onChange={handleDayChange}
        />
      </div>
      <div className="margin-r-12 width-25">
        <InputTime
          index={index}
          value={open}
          handleSubmit={handleSubmitOpen}
          handleError={handleError}
        />
      </div>
      <div className="margin-r-12 width-25">
        <InputTime
          index={index}
          value={close}
          handleSubmit={handleSubmitClose}
          handleError={handleError}
        />
      </div>
      <CloseCircleButton onClick={handleDayDelete(index)} />
    </div>
  );
};

export default OperationalHoursItem;
