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

  return (
    <Card className="coffeeshop-review">
      <h2 className="coffeeshop-review-title">Review</h2>
      <div className="coffeeshop-review-list">
      {Object.keys(review).map((key) => (
          <ReviewItem key={key} userReview={review[key]} />
        ))}
      </div>
    </Card>
  );
};

export default Review;
