import React, { useState, useEffect } from 'react';

import Checkbox from '../../../components/UI/Button/Checkbox/Checkbox';
import Card from '../../../components/UI/Card/Card';
import classes from './Filter.module.css';
import PriceRadioBtnGroup from './PriceRadioBtnGroup/PriceRadioBtnGroup';

const testing = true;
let path = [];

const Filter = ({ allCoffeeShopList, filterFunc }) => {
  const tempData = allCoffeeShopList;
  console.log("Render");
  const [filter, setFilter] = useState({
    priceChecked: false,
    openNowChecked: false,
    wiFiChecked: false,
    creditCardChecked: false,
  });

  const [showPriceRangeGroup, setShowPriceRangeGroup] = useState(false);

  
  const {
    priceChecked,
    openNowChecked,
    wiFiChecked,
    creditCardChecked,
  } = filter;

  useEffect(() => {
    filterChanged();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const checkPrice = (averagePrice) => {
    testing && path.push('8');
    switch (priceChecked) {
      case 'belowTen': {
        testing && path.push('9');
        testing && path.push('10');
        if (averagePrice < 10000) {
          testing && path.push('11');
          return true;
        } else return false;
      }

      case 'tenTillThirty': {
        testing && path.push('12');
        testing && path.push('13');

        if (averagePrice >= 10000 && averagePrice < 30000) {
          testing && path.push('14');
          return true;
        } else return false;
      }

      case 'thirtyTillFifty': {
        testing && path.push('15');
        testing && path.push('16');

        if (averagePrice >= 30000 && averagePrice <= 50000) {
          testing && path.push('17');
          return true;
        } else return false;
      }
      case 'aboveFifty': {
        testing && path.push('18');
        testing && path.push('19');

        if (averagePrice > 50000) {
          testing && path.push('20');
          return true;
        } else return false;
      }
      default:
        console.log('error');
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

    testing && path.push('27');
    if (checkDay && checkHours && checkMinutes) {
      testing && path.push('28');
      return true;
    } else return false;
  };

  const filterChanged = () => {
    testing && path.push('1');
  testing && path.push('2');
    testing && path.push('3');
    if (priceChecked) {
      testing && path.push('4');
      allCoffeeShopList = allCoffeeShopList.filter((coffeeShop, index) => {
        if (index === 0) {
          testing && path.push('5');
        }
        if (index < allCoffeeShopList.length) {
          testing && path.push('6');
        }

        const temp = checkPrice(coffeeShop.averagePrice);

        testing && path.push('7');
        return temp;
      });
      testing && path.push('21');
    }

    testing && path.push('22');
    if (openNowChecked) {
      testing && path.push('23');

      allCoffeeShopList = allCoffeeShopList.filter((coffeeShop, index) => {
        if (index === 0) {
          testing && path.push('24');
        }
        if (index < allCoffeeShopList.length) {
          testing && path.push('25');
        }

        const temp = checkIfOpen(coffeeShop.operationalHours);

        testing && path.push('26');
        return temp;
      });
      testing && path.push('29');
    }

    testing && path.push('30');
    if (wiFiChecked) {
      testing && path.push('31');

      allCoffeeShopList = allCoffeeShopList.filter((coffeeShop, index) => {
        if (index === 0) {
          testing && path.push('32');
        }
        if (index < allCoffeeShopList.length) {
          testing && path.push('33');
        }

        testing && path.push('35');
        if (coffeeShop.facilities.includes('Wifi')) {
          testing && path.push('36');
          return true;
        } else return false;
      });

      testing && path.push('37');
      testing && path.push('34');
    }

    testing && path.push('38');
    if (creditCardChecked) {
      testing && path.push('39');
      allCoffeeShopList = allCoffeeShopList.filter((coffeeShop, index) => {
        if (index === 0) {
          testing && path.push('40');
        }
        if (index < allCoffeeShopList.length) {
          testing && path.push('41');
        }

        testing && path.push('43');
        if(coffeeShop.facilities.includes('Credit Card')) {
          testing && path.push('44');
          return true;
        } else {
          return false;
        }
      });
      testing && path.push('45');
      testing && path.push('42');
    }


    testing && path.push('46');
    testing && path.push('47');
    filterFunc(allCoffeeShopList);
  };

  const checkBoxHandleChange = (name) =>
    setFilter({ ...filter, [name]: !filter[name] });

  const priceCheckedChangedHandler = (priceRange) => {
    if (priceChecked === priceRange) priceRange = false;
    if (showPriceRangeGroup) setShowPriceRangeGroup(!showPriceRangeGroup);
    setFilter({ ...filter, priceChecked: priceRange });
  };

  testing && console.log("PATH", path.join('-'));
  path = [];

  return (
    <Card className={classes.Filter} shadow>
      <h3>Filter: </h3>
      <div className={classes.Price}>
        <Checkbox
          inputId="priceGroup"
          changed={() => setShowPriceRangeGroup(!showPriceRangeGroup)}
          label="Price"
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
        inputId="openNow"
        changed={() => checkBoxHandleChange('openNowChecked')}
        label="Open Now"
        checked={openNowChecked}
      />
      <Checkbox
        inputId="wiFi"
        changed={() => checkBoxHandleChange('wiFiChecked')}
        label="Wifi"
        checked={wiFiChecked}
      />
      <Checkbox
        inputId="creditCard"
        changed={() => checkBoxHandleChange('creditCardChecked')}
        label="Credit Card"
        checked={creditCardChecked}
      />
    </Card>
  );
};

export default Filter;
