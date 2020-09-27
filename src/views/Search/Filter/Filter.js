import React, { useState, useEffect } from 'react';

import Checkbox from '../../../components/UI/Button/Checkbox/Checkbox';
import Card from '../../../components/UI/Card/Card';
import classes from './Filter.module.css';
import PriceRadioBtnGroup from './PriceRadioBtnGroup/PriceRadioBtnGroup';

const Filter = ({ allCoffeeShopList, filterFunc }) => {
  const [filter, setFilter] = useState({
    priceChecked: false,
    openNowChecked: false,
    wiFiChecked: false,
    creditCardChecked: false
  });

  const [showPriceRangeGroup, setShowPriceRangeGroup] = useState(false);

  const {
    priceChecked,
    openNowChecked,
    wiFiChecked,
    creditCardChecked
  } = filter;

  useEffect(() => {
    filterChanged();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const checkPrice = averagePrice => {
    switch (priceChecked) {
      case 'belowTen':
        return averagePrice < 10000;
      case 'tenTillThirty':
        return averagePrice >= 10000 && averagePrice < 30000;
      case 'thirtyTillFifty':
        return averagePrice >= 30000 && averagePrice <= 50000;
      case 'aboveFifty':
        return averagePrice > 50000;
      default:
        console.log('error');
    }
  };

  const checkIfOpen = operationalHours => {
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
      allCoffeeShopList = allCoffeeShopList.filter(coffeeShop =>
        checkPrice(coffeeShop.averagePrice)
      );
    if (openNowChecked)
      allCoffeeShopList = allCoffeeShopList.filter(coffeeShop =>
        checkIfOpen(coffeeShop.operationalHours)
      );
    if (wiFiChecked)
      allCoffeeShopList = allCoffeeShopList.filter(coffeeShop =>
        coffeeShop.facilities?.includes('Wifi')
      );
    if (creditCardChecked)
      allCoffeeShopList = allCoffeeShopList.filter(coffeeShop =>
        coffeeShop.facilities?.includes('Credit Card')
      );

    filterFunc(allCoffeeShopList);
  };

  const checkBoxHandleChange = name =>
    setFilter({ ...filter, [name]: !filter[name] });

  const priceCheckedChangedHandler = priceRange => {
    if (priceChecked === priceRange) priceRange = false;
    if (showPriceRangeGroup) setShowPriceRangeGroup(!showPriceRangeGroup);
    setFilter({ ...filter, priceChecked: priceRange });
  };

  return (
    <Card className={classes.Filter} shadow>
      <h3>Filter: </h3>
      <div className={classes.Price}>
        <Checkbox
          inputId='priceGroup'
          changed={() => setShowPriceRangeGroup(!showPriceRangeGroup)}
          label='Price'
          checked={priceChecked}
        >
          Price
        </Checkbox>
        {showPriceRangeGroup ? (
          <PriceRadioBtnGroup
            className={classes.PriceRadioBtnGroup}
            checked={priceChecked}
            clicked={priceCheckedChangedHandler}
          />
        ) : null}
      </div>
      <Checkbox
        inputId='openNow'
        changed={() => checkBoxHandleChange('openNowChecked')}
        label='Open Now'
        checked={openNowChecked}
      />
      <Checkbox
        inputId='wiFi'
        changed={() => checkBoxHandleChange('wiFiChecked')}
        label='Wifi'
        checked={wiFiChecked}
      />
      <Checkbox
        inputId='creditCard'
        changed={() => checkBoxHandleChange('creditCardChecked')}
        label='Credit Card'
        checked={creditCardChecked}
      />
    </Card>
  );
};

export default Filter;
