import React from "react";

import Modal from "../../../../../components/UI/Modal/Modal";
import ErrorMessage from "../../../../../components/ErrorMessage/ErrorMessage";
import { BtnMediumText } from "../../../../../components/UI/Button/Button";
import TextArea from "../../../../../components/UI/TextArea/TextArea";

import "./Review.scss";

const Review = ({
  errorMessage,
  question,
  review,
  reviewChangeHandler,
  submitClickHandler,
  prevClickHandler,
  closeClickHandler,
}) => {
  return (
    <Modal classes="feedback-rating" show={true} close={closeClickHandler}>
      <h1 className="feedback-rating-title">Rating</h1>
      {errorMessage ? (
        <ErrorMessage className="feedback-rating-title">
          {errorMessage}
        </ErrorMessage>
      ) : null}
      <form className="feedback-rating-form">
        <span className="form-question">{question}</span>
        <div className="form-radio-grp">
          <TextArea placeholder="Leave a review for others" value={review} onChange={reviewChangeHandler}/>
        </div>
      </form>
      <div className="feedback-rating-controls">
        <BtnMediumText clicked={prevClickHandler}>Previous</BtnMediumText>
        <BtnMediumText clicked={submitClickHandler}>Submit</BtnMediumText>
      </div>
    </Modal>
  );
};

export default Review;
