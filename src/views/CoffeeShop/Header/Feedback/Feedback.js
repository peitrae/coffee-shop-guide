import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import moment from "moment";

import * as actions from "../../../../store/actions";

import Rating from "./Rating/Rating";
import Review from "./Review/Review";

const Feedback = ({ close }) => {
  const dispatch = useDispatch();
  const params = useParams();

  const coffeeShopId = params.id;
  const feedbackCoffeeShop = useSelector(
    (state) => state.coffeeShop.data.feedback
  );
  const localId = useSelector((state) => state.member.localId);

  const [showQuestion, setShowQuestion] = useState(0);
  const [feedback, setFeedback] = useState({ rating: [0, 0, 0], review: "" });
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (feedbackCoffeeShop && localId && feedbackCoffeeShop[localId]) {
      setFeedback(feedbackCoffeeShop[localId]);
    }
  }, [feedbackCoffeeShop, localId]);

  const ratingQuestions = [
    "Taste and quality of product",
    "Order/delivery process",
    "Overall rating",
    "Additional review (optional)",
  ];

  const nextClickHandler = () => setShowQuestion(showQuestion + 1);

  const prevQuestionHandler = () => {
    if (showQuestion <= 0) {
      close();
    } else {
      setShowQuestion(showQuestion - 1);
    }
  };

  const ratingClickHandler = (event) => {
    const temp = {...feedback};
    const index = parseInt(event.target.name);
    const choice = parseInt(event.target.value);
    temp.rating[index] = choice;
    setFeedback(temp);
  };

  const reviewChangeHandler = (event) => {
    const temp = { ...feedback };
    temp.review = event.target.value;
    setFeedback(temp);
  };

  const submitClickHandler = () => {
    const date = new Date();
    const temp = {...feedback, created_at: moment(date).format()}
    if(temp.review === "") {
      delete temp.review
    }

    if (temp.rating.indexOf(0) === -1) {
      dispatch(actions.setFeedbackCoffeeShop(temp, coffeeShopId));
      close();
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
          rating={feedback.rating[showQuestion]}
          showQuestion={showQuestion}
          ratingClickHandler={ratingClickHandler}
          nextClickHandler={nextClickHandler}
          prevClickHandler={prevQuestionHandler}
          closeClickHandler={close}
        />
      ) : (
        <Review
          question={ratingQuestions[showQuestion]}
          review={feedback.review}
          reviewChangeHandler={reviewChangeHandler}
          submitClickHandler={submitClickHandler}
          prevClickHandler={prevQuestionHandler}
          closeClickHandler={close}
        />
      )}
    </>
  );
};

export default Feedback;
