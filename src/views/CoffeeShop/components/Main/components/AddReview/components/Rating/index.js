import React from "react";

import ErrorMessage from "../../../../../../../../components/ErrorMessage";
import { Button } from "../../../../../../../../components/UI/Button";
import Modal from "../../../../../../../../components/UI/Modal";
import SqueareFaceHappyIcon from "../../../../../../../../assets/icon/SqueareFaceHappyIcon";
import SquareFaceSmilingIcon from "../../../../../../../../assets/icon/SquareFaceSmilingIcon";
import SquareFaceSadSleepyIcon from "../../../../../../../../assets/icon/SquareFaceSadSleepyIcon";
import SquareFaceSadIcon from "../../../../../../../../assets/icon/SquareFaceSadIcon";
import SquareFaceDoubtIcon from "../../../../../../../../assets/icon/SquareFaceDoubtIcon";
import RatingRadioButton from "./components/RatingButton";

const Rating = ({
  errorMessage,
  question,
  rating,
  showQuestion,
  handleClickRating,
  handleNextQuestion,
  handlePrevQuestion,
  handleClose,
}) => {
  const label = [
    {
      icon: (
        <SquareFaceSadSleepyIcon className="add-review__icon add-review__icon--upset" />
      ),
      value: 1,
    },
    {
      icon: (
        <SquareFaceSadIcon className="add-review__icon add-review__icon--disappointed" />
      ),
      value: 2,
    },
    {
      icon: (
        <SquareFaceDoubtIcon className="add-review__icon add-review__icon--doubt" />
      ),
      value: 3,
    },
    {
      icon: (
        <SquareFaceSmilingIcon className="add-review__icon add-review__icon--satisfied" />
      ),
      value: 4,
    },
    {
      icon: (
        <SqueareFaceHappyIcon className="add-review__icon add-review__icon--pleased" />
      ),
      value: 5,
    },
  ];

  return (
    <Modal className="add-review" handleClose={handleClose}>
      <h1 className="h1 add-review__title">Rating</h1>
      {errorMessage ? (
        <ErrorMessage className="add-review__error">
          {errorMessage}
        </ErrorMessage>
      ) : null}
      <form className="add-review__form">
        <span className="add-review__question">{question}</span>
        <div className="add-review__radio-grp">
          {label.map((item) => (
            <RatingRadioButton
              key={item.value}
              item={item}
              isChecked={rating === item.value}
              name={showQuestion}
              onClick={handleClickRating}
            />
          ))}
        </div>
      </form>
      <div className="add-review__controls">
        <Button type="text" size="sm" onClick={handlePrevQuestion}>
          Back
        </Button>
        <Button type="text" size="sm" onClick={handleNextQuestion}>
          Next
        </Button>
      </div>
    </Modal>
  );
};

export default Rating;
