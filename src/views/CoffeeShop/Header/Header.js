import React, { useState } from "react";
import { useSelector } from "react-redux";

import Card from "../../../components/UI/Card/Card";
import classes from "./Header.module.css";
import { BtnMedium } from "../../../components/UI/Button/Button";
import Rating from "./Rating/Rating";

const Header = props => {
  const [showRating, setShowRating] = useState(false);

  const userId = useSelector(state => state.member.localId)
  const coffeeShopData = useSelector(state => state.coffeeShop.data);
  const { header, name, address, rating } = coffeeShopData;

  const ratingHandler = () => {
    setShowRating(true);
  };

  const ratingCancelHandler = () => {
    setShowRating(false);
  };

  const coffeeShopRatingCalculation = () => {
    const ratingArr = [];
    for (let key in rating) ratingArr.push(rating[key]);

    // const avgByColumn = ratingArr.reduce((prev, curr) => [
    //   (prev[0] + curr[0]) / ratingArr.length,
    //   (prev[1] + curr[1]) / ratingArr.length,
    //   (prev[2] + curr[2]) / ratingArr.length
    // ]);

    const overallRating =
      ratingArr.reduce((prev, curr) => prev[2] + curr[2]) / ratingArr.length;
    const toScaleTen = overallRating * 2;
    return toScaleTen.toFixed(1);
  };

  coffeeShopRatingCalculation();

  return (
    <React.Fragment>
      {showRating ? (
        <Rating
          show={showRating}
          close={ratingCancelHandler}
          ratingCoffeeShop={rating}
          coffeeShopId={props.coffeeShopId}
          userId={userId}
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
            <div className={classes.Rating}>
              {coffeeShopRatingCalculation()}
            </div>
            <BtnMedium
              btnName="Rate"
              btnType="GreenBorder"
              clicked={ratingHandler}
            />
          </div>
        </div>
      </Card>
    </React.Fragment>
  );
};

export default Header;
