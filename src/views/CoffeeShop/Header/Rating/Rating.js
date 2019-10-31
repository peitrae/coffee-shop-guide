import React, { useState } from "react"; 
import { useDispatch } from "react-redux"

import Questionnaire from "../../../../components/Questionnaire/Questionnaire";
import * as actions from "../../../../store/actions";

const Rating = props => {

  const [ratingRadioValue, setRatingRadioValue] = useState([0, 0, 0])

  const dispatch = useDispatch();
  const submitRating = (rating, coffeeShopId) => dispatch(actions.setRating(rating, coffeeShopId))

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

  const submitRatingHandler = rating => {
    submitRating(rating, props.coffeeShopId)
  }

  return (
    <Questionnaire
      show={props.show}
      close={props.close}
      header="Rating"
      questions={ratingQuestions}
      label={label}
      submitAction={submitRatingHandler}
    />
  );
};

export default Rating;
