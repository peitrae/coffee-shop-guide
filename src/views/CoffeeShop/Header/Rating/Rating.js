import React, { useState } from "react";
import { useDispatch } from "react-redux";

import Questionnaire from "../../../../components/Questionnaire/Questionnaire";
import * as actions from "../../../../store/actions";

const Rating = props => {
  const { coffeeShopId, show, close, ratingCoffeeShop, userId } = props;

  let initialValue = [0, 0, 0];
  if (userId) initialValue = ratingCoffeeShop[userId];

  const [rating, setRating] = useState(initialValue);

  const dispatch = useDispatch();
  const submitRating = (rating, coffeeShopId) =>
    dispatch(actions.setRating(rating, coffeeShopId));

  const ratingQuestions = [
    "Taste and quality of product",
    "Order/delivery process",
    "Overall rating"
  ];

  const label = [
    { label: 1, value: 1 },
    { label: 2, value: 2 },
    { label: 3, value: 3 },
    { label: 4, value: 4 },
    { label: 5, value: 5 }
  ];

  const submitRatingHandler = event => {
    event.preventDefault();
    submitRating(rating, coffeeShopId);
  };

  return (
    <Questionnaire
      show={show}
      close={close}
      header="Rating"
      questions={ratingQuestions}
      label={label}
      submitHandler={submitRatingHandler}
      answers={rating}
      setAnswers={setRating}
    />
  );
};

export default Rating;
