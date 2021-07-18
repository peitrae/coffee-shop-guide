import React from "react";

const CoffeeShopOpening = ({
  operationalHours,
  day = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
  ],
}) => (
  <div className="col">
    <div className="information__label information__label--opening">
      Jam Buka:
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
