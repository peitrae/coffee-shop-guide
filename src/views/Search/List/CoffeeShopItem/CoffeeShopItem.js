import React from "react";
import { NavLink } from "react-router-dom";

import Card from "../../../../components/UI/Card/Card";
import noImage from "../../../../assets/no-image.png";
import Promo from "../../../../components/Promo/Promo";

import "./CoffeeShopItem.scss";

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
      <Card className="coffeeshop-item">
        <img
          src={images ? images[0] : noImage}
          alt={name}
          className="coffeeshop-item-img"
        />
        <div className="coffeeshop-item-desc">
          <div>
            <h2>{name}</h2>
            <div className="address">{address}</div>
          </div>
          <div className="details">
            {operationalHours ? (
              <div className="details-wrapper">
                <div className="details-label">Hours</div>
                <span className="details-main">
                  {`: ${todayHours
                    ? `${todayHours.open} - ${todayHours.close}`
                    : "Close"}`}
                </span>
              </div>
            ) : null}

            {facilities ? (
              <div className="details-wrapper">
                <div className="details-label">Facilities</div>
                <span className="details-main">{`: ${facilities.join(", ")}`}</span>
              </div>
            ) : null}
            <div className="details-wrapper">
              <div className="details-label">Average Price</div>
              <span className="details-main">{`: Rp ${averagePrice}`}</span>
            </div>
            <div className="details-promo-grp">
              {promo
                ? Object.keys(promo).map((key) => (
                    <Promo key={key}>{promo[key].value}</Promo>
                  ))
                : null}
            </div>
          </div>
        </div>
        {profileMatching ? (
          <div className="coffeeshop-item-rating">
            <span>{profileMatching}</span>
          </div>
        ) : null}
      </Card>
    </NavLink>
  );
};

export default CoffeeShopItem;
