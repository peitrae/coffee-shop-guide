import React from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";

import Card from "../../../components/UI/Card/Card";
import ReviewItem from "./ReviewItem/ReviewItem";

import "./Review.scss";
import useFetch from "../../../hooks/useFetch";

const Review = () => {
  const reviews = useSelector((state) => state.coffeeShop.data.feedback);

  const userIds = Object.keys(reviews);

  const users = useFetch(
    "https://us-central1-coffee-shop-guide.cloudfunctions.net/getUsers",
    { method: "POST", body: userIds }
  );

  if (isEmpty(reviews)) {
    return null;
  }

  const populateWithUser = (reviews) => {
    if (!reviews) {
      return [];
    }

    const populatedReviews = users.response?.users.map((user) => ({
      name: user.displayName,
      photoUrl: user.photoURL,
      user_id: user.uid,
      ...reviews[user.uid],
    }));

    return populatedReviews;
  };

  const populatedReviews = populateWithUser(reviews);

  console.log(populatedReviews)

  return (
    <Card className="coffeeshop-review">
      <h2 className="coffeeshop-review-title">Review</h2>
      <div className="coffeeshop-review-list">
        {populatedReviews?.map((review) => (
          <ReviewItem key={review.user_id} value={review} />
        ))}
      </div>
    </Card>
  );
};

export default Review;
