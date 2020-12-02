import React, { useContext, useMemo } from "react";

import { Button } from "../../../../components/UI/Button/Button";
import { FunctionContext } from "../../UpdateCoffeeShop";
import OperationalHoursItem from "./OperationalHoursItem/OperationalHoursItem";

import { ReactComponent as PlusIcon } from "../../../../assets/svg/plus.svg";

import "./OperationalHours.scss";

const OperationalHours = ({ operationalHours }) => {
  const { onAddDays } = useContext(FunctionContext);

  const filterDaysOption = () => {
    const days = {
      0: "Sunday",
      1: "Monday",
      2: "Tuesday",
      3: "Wednesday",
      4: "Thursday",
      5: "Friday",
      6: "Saturday",
    };

    for (let item of operationalHours) {
      delete days[item.day];
    }

    return days;
  };

  const daysOptions = filterDaysOption();

  return useMemo(
    () => (
      <div className="operational-hours">
        <label className="information-label">Operational Hours</label>
        <div className="operational-hours-container">
          {operationalHours.map((item, index) => (
            <OperationalHoursItem
              key={index}
              index={index}
              day={item.day}
              daysOptions={daysOptions}
              open={item.open}
              close={item.close}
            />
          ))}
          {operationalHours.length < 7 ? (
            <Button
              size="sm"
              type="text"
              className="add-button"
              onClick={onAddDays}
              icon={PlusIcon}
            >
              Add days
            </Button>
          ) : null}
        </div>
      </div>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [operationalHours]
  );
};

export default OperationalHours;
