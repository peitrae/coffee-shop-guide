import React, { useState } from "react";
import { useSelector } from "react-redux";

import Card from "../../../components/UI/Card/Card";
import classes from "./Header.module.css";
import { BtnMedium } from "../../../components/UI/Button/Button";
import Rating from "./Rating/Rating";

const Header = props => {
  const [showRating, setShowRating] = useState(false);

  const coffeeShopData = useSelector(state => state.coffeeShop.data);
  const { header, name, address, rating} = coffeeShopData;

  const ratingHandler = () => {
    setShowRating(true);
  };

  const ratingCancelHandler = () => {
    setShowRating(false);
  };

  return (
    <React.Fragment>
      {showRating ? (
        <Rating
          show={showRating}
          close={ratingCancelHandler}
          ratingCoffeeShop={rating}
          coffeeShopId={props.coffeeShopId}
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
            <h1>{name}</h1>
            <span>{address}</span>
          </div>
          <div className={classes.Rating}>
            <div className={classes.RatingNumber}>
              <span>9.0</span>
              <span>/10</span>
            </div>
            <BtnMedium
              btnName="Beri Penilaian"
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
