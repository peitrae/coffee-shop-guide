import React, { useState, useEffect } from "react";

import Checkbox from "../../../../components/UI/Button/Checkbox/Checkbox";
import Card from "../../../../components/UI/Card/Card";
import PriceRadioBtnGroup from "./PriceRadioBtnGroup/PriceRadioBtnGroup";
import DistanceGroup from "./DistanceGroup/DistanceGroup";

import "./Filter.scss";

const Filter = ({ coffeeShops, onFilterCoffeeShops }) => {
  const [filter, setFilter] = useState({
    priceChecked: false,
    openNowChecked: false,
    wiFiChecked: false,
    creditCardChecked: false,
    distanceChecked: false,
  });

  const [showPrice, setShowPrice] = useState(false);
  const [showDistance, setShowDistance] = useState(true);

  const {
    priceChecked,
    openNowChecked,
    wiFiChecked,
    creditCardChecked,
    distanceChecked,
  } = filter;

  useEffect(() => {
    filterChanged();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const checkPrice = (averagePrice) => {
    switch (priceChecked) {
      case "belowTen":
        return averagePrice < 10000;
      case "tenTillThirty":
        return averagePrice >= 10000 && averagePrice < 30000;
      case "thirtyTillFifty":
        return averagePrice >= 30000 && averagePrice <= 50000;
      case "aboveFifty":
        return averagePrice > 50000;
      default:
        console.log("error");
    }
  };

  const checkIfOpen = (operationalHours) => {
    const date = new Date();
    const todayDay = date.getDay();
    const todayHours = date.getHours();
    const todayMinutes = date.getMinutes();

    if (!operationalHours[todayDay]) return false;

    const { day, open, close } = operationalHours[todayDay];
    const openingHours = parseInt(open.slice(0, 2));
    const openingMinutes = parseInt(open.slice(4));
    let closingHours = parseInt(close.slice(0, 2));
    let closingMinutes = parseInt(close.slice(4));

    if (closingHours === 0) closingHours = 24;
    if (closingMinutes === 0) closingMinutes = 60;

    const checkDay = day === todayDay;
    const checkHours = todayHours >= openingHours && todayHours <= closingHours;
    const checkMinutes =
      todayMinutes >= openingMinutes && todayMinutes <= closingMinutes;

    return checkDay && checkHours && checkMinutes;
  };

  const filterChanged = () => {
    if (priceChecked)
      coffeeShops = coffeeShops.filter((coffeeShop) =>
        checkPrice(coffeeShop.averagePrice)
      );
    if (openNowChecked)
      coffeeShops = coffeeShops.filter((coffeeShop) =>
        checkIfOpen(coffeeShop.operationalHours)
      );
    if (wiFiChecked)
      coffeeShops = coffeeShops.filter((coffeeShop) =>
        coffeeShop.facilities?.includes("Wifi")
      );
    if (creditCardChecked)
      coffeeShops = coffeeShops.filter((coffeeShop) =>
        coffeeShop.facilities?.includes("Credit Card")
      );

    onFilterCoffeeShops(coffeeShops);
  };

  const checkBoxHandleChange = (name) =>
    setFilter({ ...filter, [name]: !filter[name] });

  const priceClickHandler = (priceRange) => {
    if (priceChecked === priceRange) {
      priceRange = false;
    }
    if (showPrice) {
      showPriceHandler();
    }
    setFilter({ ...filter, priceChecked: priceRange });
  };

  const distanceClickHandler = (distance) => {};

  const showPriceHandler = () => setShowPrice(!showPrice);

  const showDistanceHandler = () => setShowDistance(!showDistance);

  return (
    <Card className="search-filter" shadow>
      <h3 className="search-filter-label">Filter: </h3>
      <div className="search-filter-price">
        <Checkbox
          inputId="priceGroup"
          changed={showPriceHandler}
          label="Price"
          checked={priceChecked}
        />
        {showPrice ? (
          <PriceRadioBtnGroup
            checked={priceChecked}
            clicked={priceClickHandler}
          />
        ) : null}
      </div>
      <Checkbox
        inputId="openNow"
        changed={() => checkBoxHandleChange("openNowChecked")}
        label="Open Now"
        checked={openNowChecked}
      />
      <Checkbox
        inputId="wiFi"
        changed={() => checkBoxHandleChange("wiFiChecked")}
        label="Wifi"
        checked={wiFiChecked}
      />
      <Checkbox
        inputId="creditCard"
        changed={() => checkBoxHandleChange("creditCardChecked")}
        label="Credit Card"
        checked={creditCardChecked}
      />
      <div className="search-filter-distance">
        <Checkbox
          inputId="distanceGrp"
          changed={showDistanceHandler}
          label="Distance"
          checked={distanceChecked}
        />
        {showDistance ? (
          <DistanceGroup
            onClick={distanceClickHandler}
            checked={distanceChecked}
          />
        ) : null}
      </div>
    </Card>
  );
};

export default Filter;
