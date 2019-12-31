import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from 'react-router'

import Questionnaire from "../../../../components/Questionnaire/Questionnaire";
import * as actions from "../../../../store/actions";

const RatingQuestions = props => {
  const {show, close} = props;
  const coffeeShopId = props.match.params.id
  const ratingCoffeeShop = useSelector(state => state.coffeeShop.data.rating);
  const localId = useSelector(state => state.member.localId);

  let initialValue = [0, 0, 0];
  if (ratingCoffeeShop[localId]) initialValue = ratingCoffeeShop[localId];

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
    close();
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

export default withRouter(RatingQuestions);
