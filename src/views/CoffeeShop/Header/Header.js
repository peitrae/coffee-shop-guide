import React, { useState } from "react";
import { useSelector } from "react-redux";

import Card from "../../../components/UI/Card/Card";
import classes from "./Header.module.css";
import { BtnMedium } from "../../../components/UI/Button/Button";
import RatingQuestions from "./RatingQuestions/RatingQuestions";

const Header = () => {
  const [showRatingQuest, setShowRatingQuest] = useState(false);

  const coffeeShopData = useSelector(state => state.coffeeShop.data);
  const { token, header, name, address, rating } = coffeeShopData;
  const isAuthenticated = token !== null;

  const showRatingHandler = () => setShowRatingQuest(true);

  const cancelRatingHandler = () => setShowRatingQuest(false);

  const ratingAverage = () => {
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

  console.log("rating", rating);

  return (
    <React.Fragment>
      {showRatingQuest ? (
        <RatingQuestions show={showRatingQuest} close={cancelRatingHandler} />
      ) : null}
      <Card className={classes.Header}>
        <img
          src={header}
          alt="Coffee Shop Header"
          className={classes.ImgHeader}
        />
        <div className={classes.Desc}>
          <div>
            <h1 className={classes.Name}>{name}</h1>
            <p className={classes.Address}>{address}</p>
          </div>
          <div className={classes.Feedback}>
            {rating && rating.length !== 0 ? (
              <div className={classes.Rating}>{ratingAverage()}</div>
            ) : null}
            {isAuthenticated ? (
              <BtnMedium btnType="GreenBorder" clicked={showRatingHandler}>
                Rate
              </BtnMedium>
            ) : null}
          </div>
        </div>
      </Card>
    </React.Fragment>
  );
};

export default Header;
