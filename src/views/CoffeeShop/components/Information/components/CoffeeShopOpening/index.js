import React from "react";

const CoffeeShopOpening = ({
  operationalHours,
  day = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
}) => (
  <div className="col">
    <div className="information__label information__label--opening">
      Opening Hours:
    </div>
    <div>
      {operationalHours.map((item) => (
        <div key={item.day} className="information__item">
          <span className="information__day">{day[item.day]}</span>
          <span>{`${item.open} - ${item.close}`}</span>
        </div>
      ))}
    </div>
  </div>
);

export default CoffeeShopOpening;
