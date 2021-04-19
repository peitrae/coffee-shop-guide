import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import moment from "moment";

import * as actions from "../../../../../../store/actions";

import Rating from "./components/Rating";
import Review from "./components/Review";

const AddReview = ({ handleClose }) => {
  const dispatch = useDispatch();
  const { id: coffeeShopId } = useParams();

  const reviewsCoffeeShop = useSelector(
    ({ coffeeShop }) => coffeeShop.data.reviews
  );
  const localId = useSelector(({ member }) => member.localId);

  const [showQuestion, setShowQuestion] = useState(0);
  const [review, setReview] = useState({ rating: [0, 0, 0], review_text: "" });
  const [errorMessage, setErrorMessage] = useState(undefined);

  useEffect(() => {
    if (reviewsCoffeeShop && localId && reviewsCoffeeShop[localId]) {
      setReview(reviewsCoffeeShop[localId]);
    }
  }, [reviewsCoffeeShop, localId]);

  const ratingQuestions = [
    "How much do you like the taste of the coffee?",
    "How much do you like the presentation of the coffee?",
    "How much do you like the coffee shop?",
    "Additional review (optional)",
  ];

  const handleNextQuestion = () => setShowQuestion(showQuestion + 1);

  const handlePrevQuestion = () => {
    if (showQuestion <= 0) {
      handleClose();
    } else {
      setShowQuestion(showQuestion - 1);
    }
  };

  const handleClickRating = (e) => {
    const temp = { ...review };
    const index = parseInt(e.target.name);
    const choice = parseInt(e.target.value);

    temp.rating[index] = choice;
    setReview(temp);
  };

  const handleReviewChange = (event) => {
    const temp = { ...review };
    temp.review_text = event.target.value;
    setReview(temp);
  };

  const handleSubmit = () => {
    const date = new Date();
    const temp = { ...review, created_at: moment(date).format() };
    if (temp.review === "") {
      delete temp.review;
    }

    if (temp.rating.indexOf(0) === -1) {
      dispatch(actions.addCoffeeShopReview(temp, coffeeShopId));
      handleClose();
    } else {
      setErrorMessage("Fill all rating");
    }
  };

  return (
    <>
      {showQuestion < 3 ? (
        <Rating
          errorMessage={errorMessage}
          question={ratingQuestions[showQuestion]}
          rating={review.rating[showQuestion]}
          showQuestion={showQuestion}
          handleClickRating={handleClickRating}
          handleNextQuestion={handleNextQuestion}
          handlePrevQuestion={handlePrevQuestion}
          handleClose={handleClose}
        />
      ) : (
        <Review
          errorMessage={errorMessage}
          question={ratingQuestions[showQuestion]}
          review={review.review_text}
          handleReviewChange={handleReviewChange}
          handleSubmit={handleSubmit}
          handlePrevQuestion={handlePrevQuestion}
          handleClose={handleClose}
        />
      )}
    </>
  );
};

export default AddReview;
