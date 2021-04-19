import React from "react";
import { NavLink } from "react-router-dom";

import Card from "../../../../../../components/UI/Card";
import noImage from "../../../../../../assets/no-image.png";
import SmallPromoItem from "../../../../../../components/SmallPromoItem";
import roundDecimal from "./../../utils/roundDecimal";

const CoffeeShopItem = ({ coffeeShop }) => {
  const {
    id,
    name,
    images,
    address,
    operationalHours,
    averagePrice,
    facilities,
    profileMatching,
    promo,
  } = coffeeShop;

  const todayHours = operationalHours && operationalHours[new Date().getDay()];

  return (
    <NavLink to={`/coffee-shop/${id}`}>
      <Card className="search-item">
        <img
          src={images ? images[0] : noImage}
          alt={name}
          className="search-item__img"
        />
        <div className="search-item__body">
          <div>
            <h3 className="search-item__name">{name}</h3>
            <div className="search-item__address search-item__address--item">
              {address}
            </div>
          </div>
          <div>
            {operationalHours ? (
              <div className="search-item__information-item">
                <div className="search-item__information-label">Hours</div>
                <span className="search-item__information-value">
                  {`: ${
                    todayHours
                      ? `${todayHours.open} - ${todayHours.close}`
                      : "Close"
                  }`}
                </span>
              </div>
            ) : null}
            {facilities ? (
              <div className="search-item__information-item">
                <div className="search-item__information-label">Facilities</div>
                <span className="search-item__information-value">{`: ${facilities.join(
                  ", "
                )}`}</span>
              </div>
            ) : null}
            {averagePrice ? (
              <div className="search-item__information-item">
                <div className="search-item__information-label">
                  Average Price
                </div>
                <span className="search-item__information-value">{`: Rp ${averagePrice}`}</span>
              </div>
            ) : null}
            <div className="search-item__promo-grp">
              {promo
                ? Object.keys(promo).map((key) => (
                    <SmallPromoItem key={key} className="margin-r-6">
                      {promo[key].value}
                    </SmallPromoItem>
                  ))
                : null}
            </div>
          </div>
        </div>
        {profileMatching ? (
          <div className="search-item__rating">
            <span>{roundDecimal(profileMatching)}</span>
          </div>
        ) : null}
      </Card>
    </NavLink>
  );
};

export default CoffeeShopItem;
