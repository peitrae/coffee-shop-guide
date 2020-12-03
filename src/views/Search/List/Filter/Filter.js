import React, { useState, useEffect } from "react";
import { isPointWithinRadius } from "geolib";

import Checkbox from "../../../../components/UI/Button/Checkbox/Checkbox";
import Card from "../../../../components/UI/Card/Card";
import Price from "./Price/Price";
import Distance from "./Distance/Distance";

import "./Filter.scss";

const Filter = ({ coffeeShops, onFilter }) => {
  const [filter, setFilter] = useState({
    priceChecked: false,
    openNowChecked: false,
    wiFiChecked: false,
    promoChecked: false,
    cashlessChecked: false,
    distanceChecked: false,
  });

  const {
    priceChecked,
    openNowChecked,
    wiFiChecked,
    promoChecked,
    cashlessChecked,
    distanceChecked,
  } = filter;

  useEffect(() => {
    filterChanged();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const checkPrice = (averagePrice) => {
    switch (priceChecked) {
      case 1:
        return averagePrice < 10000;
      case 2:
        return averagePrice >= 10000 && averagePrice < 30000;
      case 3:
        return averagePrice >= 30000 && averagePrice <= 50000;
      case 4:
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

  const checkCashless = (facilities) => {
    const cashless = {
      "Debit/Credit Card": true,
      OVO: true,
      Gopay: true,
    };

    for (let facility of facilities) {
      if (cashless[facility]) {
        return true;
      }
    }
  };

  const withinRadius = async (coffeeShops, radius) => {
    try {
      const pos = await new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej);
      });

      return coffeeShops.filter(({ location }) => {
        if (!location) {
          return false;
        }

        return isPointWithinRadius(
          { latitude: location.lat, longitude: location.long },
          { latitude: pos.coords.latitude, longitude: pos.coords.longitude },
          radius
        );
      });
    } catch (error) {
      return { error };
    }
  };

  const filterChanged = async () => {
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
    if (promoChecked) {
      coffeeShops = coffeeShops.filter((coffeeShop) => coffeeShop.promo);
    }
    if (cashlessChecked) {
      coffeeShops = coffeeShops.filter(({ facilities }) => {
        return facilities ? checkCashless(facilities) : false;
      });
    }
    if (distanceChecked) {
      const coffeeShopWithinRadius = await withinRadius(
        coffeeShops,
        distanceChecked
      );
      if (coffeeShopWithinRadius.error) {
        console.log(coffeeShopWithinRadius);
      } else {
        coffeeShops = coffeeShopWithinRadius;
      }
    }
    onFilter(coffeeShops);
  };

  const checkBoxHandleChange = (name) =>
    setFilter({ ...filter, [name]: !filter[name] });

  const onClickPrice = (priceRange) => {
    if (priceChecked === priceRange) {
      priceRange = false;
    }
    setFilter({ ...filter, priceChecked: priceRange });
  };

  const onClickDistance = (distance) => {
    if (distanceChecked === distance) {
      distance = false;
    }

    setFilter({ ...filter, distanceChecked: distance });
  };

  return (
    <Card className="search-filter" shadow>
      <h3 className="search-filter-label">Filter: </h3>
      <Price checked={priceChecked} onClickPrice={onClickPrice} />
      <Checkbox
        changed={() => checkBoxHandleChange("openNowChecked")}
        label="Open Now"
        checked={openNowChecked}
        className="search-filter-checkbox"
      />
      <Checkbox
        changed={() => checkBoxHandleChange("promoChecked")}
        label="Promo"
        checked={promoChecked}
        className="search-filter-checkbox"
      />
      <Checkbox
        changed={() => checkBoxHandleChange("wiFiChecked")}
        label="Wifi"
        checked={wiFiChecked}
        className="search-filter-checkbox"
      />
      <Checkbox
        changed={() => checkBoxHandleChange("cashlessChecked")}
        label="Cashless"
        checked={cashlessChecked}
        className="search-filter-checkbox"
      />
      <Distance checked={distanceChecked} onClickDistance={onClickDistance} />
    </Card>
  );
};

export default Filter;
