import React, { useState } from "react";
import {useSelector } from "react-redux";

import Card from "../../../components/UI/Card/Card";
import classes from "./Header.module.css";
import { BtnMedium } from "../../../components/UI/Button/Button";
import Rating from "./Rating/Rating";

const Header = props => {
  const [showRatingQuest, setShowRatingQuest] = useState(false);

  const isAuthenticated = useSelector(state => state.member.token !== null);
  const localId = useSelector(state => state.member.localId);
  const coffeeShopData = useSelector(state => state.coffeeShop.data);
  const { header, name, address, rating } = coffeeShopData;

  const ratingHandler = () => setShowRatingQuest(true);

  const ratingCancelHandler = () => setShowRatingQuest(false);

  const coffeeShopRatingCalculation = () => {
    const ratingArr = [];
    for (let key in rating) ratingArr.push(rating[key]);

    let overallRating = 0;
    ratingArr.length === 1
      ? (overallRating =
          ratingArr[0].reduce((prev, curr) => prev + curr) /
          ratingArr[0].length)
      : (overallRating =
          ratingArr.reduce((prev, curr) => prev[2] + curr[2]) /
          ratingArr.length);

    const toScaleTen = overallRating * 2;

    return toScaleTen.toFixed(1);
  };

  return (
    <React.Fragment>
      {showRatingQuest ? (
        <Rating
          show={showRatingQuest}
          close={ratingCancelHandler}
          ratingCoffeeShop={rating}
          coffeeShopId={props.coffeeShopId}
          localId={localId}
        />
      ) : null}
      <Card cardType={classes.Header}>
        <img
          src={header}
          alt="Coffee Shop Header"
          className={classes.ImgHeader}
        />
        <div className={classes.Desc}>
          <div>
            <h1 className={classes.Name}>{name}</h1>
            <span className={classes.Address}>{address}</span>
          </div>
          <div className={classes.Feedback}>
            {rating ? (
              <div className={classes.Rating}>
                {coffeeShopRatingCalculation()}
              </div>
            ) : null}
            {isAuthenticated ? (
              <BtnMedium
                btnName="Rate"
                btnType="GreenBorder"
                clicked={ratingHandler}
              />
            ) : null}
          </div>
        </div>
      </Card>
    </React.Fragment>
  );
};

export default Header;
