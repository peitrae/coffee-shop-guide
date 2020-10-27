import React from "react";

import Modal from "../../../../../components/UI/Modal/Modal";

import ErrorMessage from "../../../../../components/ErrorMessage/ErrorMessage";
import { BtnMediumText } from "../../../../../components/UI/Button/Button";

import SqueareFaceHappyIcon from "../../../../../assets/icon/SqueareFaceHappyIcon";
import SquareFaceSmilingIcon from "../../../../../assets/icon/SquareFaceSmilingIcon";
import SquareFaceSadSleepyIcon from "../../../../../assets/icon/SquareFaceSadSleepyIcon";
import SquareFaceSadIcon from "../../../../../assets/icon/SquareFaceSadIcon";
import SquareFaceDoubtIcon from "../../../../../assets/icon/SquareFaceDoubtIcon";

import "./Rating.scss";

const Rating = ({
  errorMessage,
  question,
  rating,
  showQuestion,
  ratingClickHandler,
  nextClickHandler,
  prevClickHandler,
  closeClickHandler,
}) => {
  const label = [
    {
      icon: (
        <SquareFaceSadSleepyIcon className="radio-icon" id="sad-sleepy-icon" />
      ),
      value: 1,
    },
    {
      icon: <SquareFaceSadIcon className="radio-icon" id="sad-icon" />,
      value: 2,
    },
    {
      icon: <SquareFaceDoubtIcon className="radio-icon" id="doubt-icon" />,
      value: 3,
    },
    {
      icon: <SquareFaceSmilingIcon className="radio-icon" id="smiling-icon" />,
      value: 4,
    },
    {
      icon: <SqueareFaceHappyIcon className="radio-icon" id="happy-icon" />,
      value: 5,
    },
  ];

  return (
    <Modal classes="feedback-rating" show={true} close={closeClickHandler}>
      <h1 className="feedback-rating-title">Rating</h1>
      {errorMessage ? (
        <ErrorMessage className="feedback-rating-error">
          {errorMessage}
        </ErrorMessage>
      ) : null}
      <form className="feedback-rating-form">
        <span className="form-question">{question}</span>
        <div className="form-radio-grp">
          {label.map((element) => {
            const isChecked = rating === element.value;
            return (
              <label
                key={element.value}
                className={`form-radio-btn ${
                  isChecked ? "radio-active" : null
                }`}
              >
                <input
                  type="radio"
                  name={showQuestion}
                  value={element.value}
                  onClick={ratingClickHandler}
                  checked={isChecked}
                  readOnly
                />
                {element.icon}
              </label>
            );
          })}
        </div>
      </form>
      <div className="feedback-rating-controls">
        <BtnMediumText clicked={prevClickHandler}>Back</BtnMediumText>
        <BtnMediumText clicked={nextClickHandler}>Next</BtnMediumText>
      </div>
    </Modal>
  );
};

export default Rating;
