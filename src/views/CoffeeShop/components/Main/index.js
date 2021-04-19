import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isEmpty } from "lodash";

import Card from "../../../../components/UI/Card";
import { Button } from "../../../../components/UI/Button";
import AddReview from "./components/AddReview";
import PromoList from "./components/PromoList";
import BookmarkButton from "./components/BookmarkButton";
import Share from "./components/Share";
import * as actions from "../../../../store/actions";

const Header = () => {
  const dispatch = useDispatch();

  const [showAddReview, setShowAddReview] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const { bookmark } = useSelector(({ member }) => member);
  const coffeeShop = useSelector(({ coffeeShop }) => coffeeShop.data);

  const {
    id: coffeeShopId,
    header,
    name,
    address,
    reviews,
    promo,
  } = coffeeShop;

  useEffect(() => {
    const bookmarked = bookmark.includes(coffeeShopId);

    if (bookmarked) {
      setIsBookmarked(true);
    } else {
      setIsBookmarked(false);
    }
  }, [bookmark, coffeeShopId]);

  const handleBookmark = (coffeeShopId, coffeeShopIds) => {
    if (isBookmarked) {
      const index = bookmark.indexOf(coffeeShopId);
      coffeeShopIds.splice(index, 1);
    } else {
      coffeeShopIds.unshift(coffeeShopId);
    }

    setIsBookmarked(!isBookmarked);
    dispatch(actions.setBookmark(coffeeShopIds));
  };

  const ratingAverage = (reviews) => {
    const rating = [];

    for (let key in reviews) {
      rating.push(reviews[key].rating[2]);
    }

    const sum = rating.reduce((a, b) => a + b, 0);
    const avg = sum / rating.length || 0;

    return avg.toFixed(1);
  };

  return (
    <>
      <Card className="main margin-b-16">
        <img src={header} alt="Coffee Shop Header" className="main__img" />
        <div className="main__grid">
          <div className="main__grid-item">
            <div className="col">
              <h1 className="main__name">{name}</h1>
              <BookmarkButton
                isBookmarked={isBookmarked}
                handleBookmark={() => handleBookmark(coffeeShopId, bookmark)}
              />
              <Share />
            </div>
            {promo ? <PromoList promos={promo} /> : null}
            <p className="main__address">{address}</p>
          </div>
          <div className="main__grid-item">
            {!isEmpty(reviews) ? (
              <div className="main__overall-rating margin-b-16">
                {ratingAverage(reviews)}
              </div>
            ) : null}
            <Button
              className="width-100"
              type="outlined"
              onClick={() => setShowAddReview(true)}
            >
              Rate
            </Button>
          </div>
        </div>
      </Card>
      {showAddReview ? (
        <AddReview handleClose={() => setShowAddReview(false)} />
      ) : null}
    </>
  );
};

export default Header;
