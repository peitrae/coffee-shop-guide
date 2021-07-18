import React from "react";
import { useSelector } from "react-redux";

import Card from "../../../../components/UI/Card";
import CoffeeShopOpening from "./components/CoffeeShopOpening";
import CoffeeShopOthersInfo from "./components/CoffeeShopOthersInfo";

const Information = () => {
  const coffeeShop = useSelector(({ coffeeShop }) => coffeeShop.data);
  const { operationalHours, averagePrice, contact, facilities } = coffeeShop;

  if (!operationalHours && !averagePrice && !contact && !facilities) {
    return null;
  }

  return (
    <Card className="information margin-b-16">
      <h2 className="information__title">Informasi</h2>
      <div className="information__grid">
        <div className="information__grid-opening">
          {operationalHours ? (
            <CoffeeShopOpening operationalHours={operationalHours} />
          ) : null}
        </div>
        <div className="information__grid-others">
          <CoffeeShopOthersInfo
            averagePrice={averagePrice}
            contact={contact}
            facilities={facilities}
          />
        </div>
      </div>
    </Card>
  );
};

export default Information;
