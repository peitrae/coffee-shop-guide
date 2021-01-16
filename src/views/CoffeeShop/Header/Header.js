import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { isEmpty } from "lodash";

import Card from "../../../components/UI/Card/Card";
import { BtnMedium, PlainBtn } from "../../../components/UI/Button/Button";
import Feedback from "./Feedback/Feedback";
import Share from "./Share/Share";
import * as actions from "../../../store/actions";
import Promo from "../../../components/Promo/Promo"

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
  const coffeeShop = useSelector((state) => state.coffeeShop.data);
  const { coffeeShop_id, header, name, address, feedback, promo } = coffeeShop;

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

  const bookmarkClickHandler = (coffeeShop_id, coffeeShop_ids) => {
    console.log("Input", coffeeShop_id, coffeeShop_ids )
    if (isBookmarked) {
      const index = bookmark.indexOf(coffeeShop_id);
      coffeeShop_ids.splice(index, 1);
    } else {
      coffeeShop_ids.unshift(coffeeShop_id);
    }

    setIsBookmarked(!isBookmarked);
    dispatch(actions.setBookmark(coffeeShop_ids));
  };

  const ratingAverage = () => {
    const rating = [];

    for (let key in feedback) {
      rating.push(feedback[key].rating[2]);
    }

    const sum = rating.reduce((a, b) => a + b, 0);
    const avg = sum / rating.length || 0;

    return avg.toFixed(1);
  };

  return (
    <>
      {showRatingQuest ? (
        <Feedback show={showRatingQuest} close={cancelRatingHandler} />
      ) : null}
      <Card className="coffeeshop-header">
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
                onClick={() => bookmarkClickHandler(coffeeShop_id, bookmark)}
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
            <div className="content-promo-grp">
              {promo
                ? Object.keys(promo).map((key) => (
                    <Promo>{promo[key].value}</Promo>
                  ))
                : null}
            </div>
            <p className="content-address">{address}</p>
          </div>
          <div className="coffeeshop-header-rating">
            {isEmpty(feedback) ? null : (
              <div className="content">{ratingAverage()}</div>
            )}
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
