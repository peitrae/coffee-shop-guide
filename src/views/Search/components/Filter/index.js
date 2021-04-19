import React, { useState, useEffect } from "react";

import Card from "../../../../components/UI/Card";
import Price from "./components/Price";
import Radius from "./components/Radius";

import filterPrice from "./utils/filterPrice";
import filterOpen from "./utils/filterOpen";
import filterPromo from "./utils/filterPromo";
import filterWifi from "./utils/filterWifi";
import filterCashless from "./utils/filterCashless";
import filterRadius from "./utils/filterRadius";
import FilterButton from "./components/FilterButton";

const Filter = ({ coffeeShops, handleSetFilteredCoffeShops }) => {
  const [filter, setFilter] = useState({
    priceChecked: false,
    openNowChecked: false,
    wiFiChecked: false,
    promoChecked: false,
    cashlessChecked: false,
    radiusChecked: false,
  });

  const {
    priceChecked,
    openNowChecked,
    wiFiChecked,
    promoChecked,
    cashlessChecked,
    radiusChecked,
  } = filter;

  useEffect(() => {
    handleFilterChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const handleFilterChange = async () => {
    if (priceChecked) {
      coffeeShops = filterPrice(coffeeShops, priceChecked);
    }
    if (openNowChecked) {
      coffeeShops = filterOpen(coffeeShops);
    }
    if (promoChecked) {
      coffeeShops = filterPromo(coffeeShops);
    }
    if (wiFiChecked) {
      coffeeShops = filterWifi(coffeeShops);
    }
    if (cashlessChecked) {
      coffeeShops = filterCashless(coffeeShops);
    }
    if (radiusChecked) {
      coffeeShops = await filterRadius(coffeeShops, radiusChecked);
    }
    handleSetFilteredCoffeShops(coffeeShops);
  };

  const handleFilterClick = (item) => {
    setFilter({ ...filter, [item]: !filter[item] });
  };

  const handlePriceItemClick = (priceRange) => {
    if (priceChecked === priceRange) {
      priceRange = false;
    }
    setFilter({ ...filter, priceChecked: priceRange });
  };

  const handleRadiusItemClick = (radius) => {
    if (radiusChecked === radius) {
      radius = false;
    }

    setFilter({ ...filter, radiusChecked: radius });
  };

  return (
    <Card className="search-filter" shadow={true}>
      <h3 className="search-filter__label">Filter: </h3>
      <Price
        checked={priceChecked}
        handlePriceItemClick={handlePriceItemClick}
      />
      <FilterButton
        active={openNowChecked}
        onClick={() => handleFilterClick("openNowChecked")}
      >
        Open Now
      </FilterButton>
      <FilterButton
        active={promoChecked}
        onClick={() => handleFilterClick("promoChecked")}
      >
        Promo
      </FilterButton>
      <FilterButton
        active={wiFiChecked}
        onClick={() => handleFilterClick("wiFiChecked")}
      >
        Wifi
      </FilterButton>
      <FilterButton
        active={cashlessChecked}
        onClick={() => handleFilterClick("cashlessChecked")}
      >
        Cashless
      </FilterButton>
      <Radius
        checked={radiusChecked}
        handleRadiusItemClick={handleRadiusItemClick}
      />
    </Card>
  );
};

export default Filter;
