import React from "react";
import { useSelector } from "react-redux";

import Card from "../../../components/UI/Card/Card";
import ReviewItem from "./ReviewItem/ReviewItem";

import "./Review.scss";

const Review = () => {
  const review = useSelector((state) => state.coffeeShop.data.feedback);

  if (!review) {
    return null;
  }

  const reviewArr = [];
  for (let key in review) {
    reviewArr.push({
      ...review[key],
      userId: key,
    });
  }

  return (
    <Card className="coffeeshop-review">
      <h2 className="coffeeshop-review-title">Review</h2>
      <div className="coffeeshop-review-list">
        {reviewArr.map((review) => (
          <ReviewItem userReview={review} />
        ))}
      </div>
    </Card>
  );
};

export default Review;
