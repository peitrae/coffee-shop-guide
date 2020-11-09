import React, { useState, useEffect, useRef } from "react";
import { isPointWithinRadius } from "geolib";

import Checkbox from "../../../../components/UI/Button/Checkbox/Checkbox";
import Card from "../../../../components/UI/Card/Card";
import PriceGroup from "./PriceGroup/PriceGroup";
import DistanceGroup from "./DistanceGroup/DistanceGroup";

import "./Filter.scss";

const Filter = ({ coffeeShops, onFilter }) => {
  const priceRef = useRef();
  const distanceRef = useRef();

  const [filter, setFilter] = useState({
    priceChecked: false,
    openNowChecked: false,
    wiFiChecked: false,
    creditCardChecked: false,
    distanceChecked: false,
  });

  const [showPrice, setShowPrice] = useState(false);
  const [showDistance, setShowDistance] = useState(false);

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

    const todayOperational = operationalHours.find(
      (item) => todayDay === item.day
    );

    if (!todayOperational) return false;

    const { day, open, close } = todayOperational;
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

  const withinRadius = (coffeeShops, radius) => {
    const user = { lat: -7.983, long: 112.621 };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((location) => {
        user.lat = location.coords.latitude;
        user.long = location.coords.longitude;
      });
    }

    return coffeeShops.filter(({ location }) => {
      if (!location) {
        return false;
      }

      return isPointWithinRadius(
        { latitude: location.lat, longitude: location.long },
        { latitude: user.lat, longitude: user.long },
        radius
      );
    });
  };

  const filterChanged = () => {
    if (priceChecked) {
      coffeeShops = coffeeShops.filter((coffeeShop) =>
        checkPrice(coffeeShop.averagePrice)
      );
    }
    if (openNowChecked) {
      coffeeShops = coffeeShops.filter((coffeeShop) =>
        checkIfOpen(coffeeShop.operationalHours)
      );
    }
    if (wiFiChecked) {
      coffeeShops = coffeeShops.filter((coffeeShop) =>
        coffeeShop.facilities?.includes("Wifi")
      );
    }
    if (creditCardChecked) {
      coffeeShops = coffeeShops.filter((coffeeShop) =>
        coffeeShop.facilities?.includes("Credit Card")
      );
    }
    if (distanceChecked) {
      coffeeShops = withinRadius(coffeeShops, distanceChecked);
      console.log(coffeeShops);
    }
    onFilter(coffeeShops);
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

  const distanceClickHandler = (distance) => {
    if (distanceChecked === distance) {
      distance = false;
    }
    if (showDistance) {
      showDistanceHandler();
    }
    setFilter({ ...filter, distanceChecked: distance });
  };

  const showPriceHandler = () => setShowPrice(!showPrice);

  const closePriceHandler = (e) => {
    if (e && priceRef.current.contains(e.target)) {
      return;
    }

    setShowPrice(!showPrice);
  };

  const showDistanceHandler = () => setShowDistance(!showDistance);

  const closeDistanceHandler = (e) => {
    if (e && distanceRef.current.contains(e.target)) {
      return;
    }

    setShowPrice(!showPrice);
  };

  return (
    <Card className="search-filter" shadow>
      <h3 className="search-filter-label">Filter: </h3>
      <div className="search-filter-price">
        <Checkbox
          inputId="priceGroup"
          changed={showPriceHandler}
          label="Price"
          checked={priceChecked}
          ref={priceRef}
        />
        {showPrice ? (
          <PriceGroup
            checked={priceChecked}
            onClick={priceClickHandler}
            onClickOutside={closePriceHandler}
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
          ref={distanceRef}
        />
        {showDistance ? (
          <DistanceGroup
            onClick={distanceClickHandler}
            onClickOutside={closeDistanceHandler}
            checked={distanceChecked}
          />
        ) : null}
      </div>
    </Card>
  );
};

export default Filter;
