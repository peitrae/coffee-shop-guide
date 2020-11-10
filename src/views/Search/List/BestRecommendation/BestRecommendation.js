import React from "react";
import { NavLink } from "react-router-dom";

import Card from "../../../../components/UI/Card/Card";
import noImage from "../../../../assets/no-image.png";
import Promo from "../../../../components/Promo/Promo";

import "./BestRecommendation.scss";

const BestRecommendation = ({ coffeeShop }) => {
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

  return (
    <NavLink to={`/coffee-shop/${id}`}>
      <Card className="best-recommend" shadow>
        <div className="best-recommend-accent"></div>
        <div className="best-recommend-main">
          <h1 className="main-title">Best for you</h1>
          <div className="main-coffeeshop">
            <img
              src={images ? images[0] : noImage}
              alt={name}
              className="main-coffeeshop-img"
            />
            <div className="main-coffeeshop-desc">
              <div>
                <h2 className="name">{name}</h2>
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
              <div className="main-rating">
                <span>{profileMatching}</span>
              </div>
            ) : null}
          </div>
        </div>
      </Card>
    </NavLink>
  );
};

export default BestRecommendation;
