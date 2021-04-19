import React from "react";
import { NavLink } from "react-router-dom";

import Card from "../../../../../../components/UI/Card";
import noImage from "../../../../../../assets/no-image.png";
import SmallPromoItem from "../../../../../../components/SmallPromoItem";
import roundDecimal from "./../../utils/roundDecimal";

const BestItem = ({ coffeeShop }) => {
  const {
    id,
    name,
    images,
    address,
    operationalHours,
    averagePrice,
    profileMatching,
    facilities,
    promo,
  } = coffeeShop;

  const todayHours = operationalHours && operationalHours[new Date().getDay()];

  return (
    <NavLink to={`/coffee-shop/${id}`}>
      <Card className="search-item search-item--best" shadow={true}>
        <div className="search-item__accent"></div>
        <h2 className="search-item__title">Best for you</h2>
        <div className="col">
          <img
            src={images ? images[0] : noImage}
            alt={name}
            className="search-item__img search-item__img--best"
          />
          <div className="search-item__body">
            <div>
              <h3 className="search-item__name">{name}</h3>
              <span className="search-item__address">{address}</span>
            </div>
            <div>
              {operationalHours ? (
                <div className="search-item__information-item">
                  <div className="search-item__information-label">Hours</div>
                  <span className="search-item__information-value">
                    {todayHours
                      ? `: ${todayHours.open} - ${todayHours.close}`
                      : ": Close"}
                  </span>
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
              {facilities ? (
                <div className="search-item__information-item">
                  <div className="search-item__information-label">
                    Facilities
                  </div>
                  <span className="search-item__information-value">{`: ${facilities.join(
                    ", "
                  )}`}</span>
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
              {roundDecimal(profileMatching)}
            </div>
          ) : null}
        </div>
      </Card>
    </NavLink>
  );
};

export default BestItem;
