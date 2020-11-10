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
    profileMatching,
    promo,
  } = coffeeShop;

  const todayHours = operationalHours[new Date().getDay()];

  console.log(promo)

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
            <span className="address">{address}</span>
          </div>
          <div className="details">
            <div className="details-wrapper">
              <div className="details-label">Hours:</div>
              <span className="details-main">
                {todayHours
                  ? `${todayHours.open} - ${todayHours.close}`
                  : "Close"}
              </span>
            </div>
            <div className="details-wrapper">
              <div className="details-label">Average Price:</div>
              <span className="details-main">{`Rp ${averagePrice}`}</span>
            </div>
            <div className="details-promo-grp">
              {promo
                ? Object.keys(promo).map((key) => (
                    <Promo>{promo[key].value}</Promo>
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
