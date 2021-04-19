import React, { useContext } from "react";

import { Button } from "../../../../../../components/UI/Button";
import { FunctionContext } from "../../../..";
import { ReactComponent as PlusIcon } from "../../../../../../assets/svg/plus.svg";
import OperationalHoursItem from "./components/OperationalHoursItem";

const OperationalHours = ({ operationalHours }) => {
  const { handleAddDays } = useContext(FunctionContext);

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

  return (
    <div className="col margin-v-8 operational-hours">
      <label className="add-coffeeshop__label">Operational Hours</label>
      <div>
        {operationalHours.map((item, index) => (
          <OperationalHoursItem
            key={index}
            index={index}
            item={item}
            daysOptions={daysOptions}
          />
        ))}
        {operationalHours.length < 7 ? (
          <Button size="sm" type="text" onClick={handleAddDays} icon={PlusIcon}>
            Add days
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default OperationalHours;
