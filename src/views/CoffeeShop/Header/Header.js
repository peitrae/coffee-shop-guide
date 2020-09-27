import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import Card from "../../../components/UI/Card/Card";
import classes from "./Header.module.css";
import { BtnMedium, PlainBtn } from "../../../components/UI/Button/Button";
import RatingQuestions from "./RatingQuestions/RatingQuestions";
import Share from "./Share/Share";
import * as actions from "../../../store/actions";

import ShareIcon from "../../../assets/icon/ShareIcon";
import BookmarkIcon from "../../../assets/icon/BookmarkIcon";

import "./Header.scss";

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const shareBtnRef = useRef();

  const [showRatingQuest, setShowRatingQuest] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const { token, bookmark } = useSelector((state) => state.member);
  const coffeeShopData = useSelector((state) => state.coffeeShop.data);
  const { coffeeShop_id, header, name, address, rating } = coffeeShopData;

  useEffect(() => {
    const bookmarked = bookmark.includes(coffeeShop_id);

    if (bookmarked) {
      setIsBookmarked(true);
    } else {
      setIsBookmarked(false);
    }
  }, [bookmark, coffeeShop_id]);

  const isAuthenticated = token !== null;

  const showRatingHandler = () => setShowRatingQuest(true);

  const cancelRatingHandler = () => setShowRatingQuest(false);

  const showShareHandler = () => setShowShare(!showShare);

  const clickOutsideShare = (e) => {
    if (shareBtnRef.current.contains(e.target)) {
      return;
    }

    showShareHandler();
  };

  const bookmarkClickHandler = (id) => {
    if (isBookmarked) {
      const index = bookmark.indexOf(id);
      bookmark.splice(index, 1);
    } else {
      bookmark.unshift(id);
    }

    setIsBookmarked(!isBookmarked);
    dispatch(actions.setBookmark(bookmark));
  };

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

  return (
    <>
      {showRatingQuest ? (
        <RatingQuestions show={showRatingQuest} close={cancelRatingHandler} />
      ) : null}

      <Card className={classes.Header}>
        <img
          src={header}
          alt="Coffee Shop Header"
          className="coffeeshop-header-img"
        />
        <div className="coffeeshop-header-content">
          <div className="content">
            <div className="content-header">
              <h1 className="content-name">{name}</h1>
              <PlainBtn
                className="content-control-btn"
                onClick={() => bookmarkClickHandler(coffeeShop_id)}
              >
                <BookmarkIcon
                  fill={isBookmarked ? "#219653" : "none"}
                  color={isBookmarked ? "#219653" : undefined}
                />
              </PlainBtn>
              <div className="content-share">
                <PlainBtn
                  className="content-control-btn"
                  onClick={showShareHandler}
                  ref={shareBtnRef}
                >
                  <ShareIcon />
                </PlainBtn>
                {showShare ? (
                  <Share
                    onClickOutside={clickOutsideShare}
                    link={process.env.REACT_APP_URL + location.pathname}
                  />
                ) : null}
              </div>
            </div>
            <p className="content-address">{address}</p>
          </div>
          <div className="coffeeshop-header-rating">
            {rating && rating.length !== 0 ? (
              <div className="content">{ratingAverage()}</div>
            ) : null}
            {isAuthenticated ? (
              <BtnMedium btnType="GreenBorder" clicked={showRatingHandler}>
                Rate
              </BtnMedium>
            ) : null}
          </div>
        </div>
      </Card>
    </>
  );
};

export default Header;
