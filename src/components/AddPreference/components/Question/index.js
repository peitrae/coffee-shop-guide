import React from "react";

import Modal from "../../../UI/Modal";
import ErrorMessage from "../../../ErrorMessage";
import { Button } from "../../../UI/Button";
import RadioButton from "../../../UI/RadioButton";

const Questionnaire = ({
  showQuestion,
  type,
  checked,
  error,
  handleNext,
  handlePrev,
  handleRadioClick,
  handleClose,
  handleSubmit,
}) => {
  return (
    <Modal
      className="add-preference preference-questionnaire"
      handleClose={handleClose}
    >
      <h1 className="h1 c-primary h1--add-preference">Your Preference</h1>
      {error ? (
        <ErrorMessage className="add-preference__error">{error}</ErrorMessage>
      ) : null}
      <form className="add-preference__form">
        <span className="add-preference__question">
          {type[showQuestion].question}
        </span>
        <div className="add-preference__radio-grp">
          {type[showQuestion].options.map((option) => (
            <RadioButton
              key={option.label}
              name={showQuestion}
              onClick={handleRadioClick}
              value={option.value}
              checked={checked === option.value}
              className="add-preference__btn-radio"
            >
              {option.label}
            </RadioButton>
          ))}
        </div>
      </form>
      <div className="add-preference__controls">
        {showQuestion === 0 ? (
          <Button type="text" size="sm" onClick={handleClose}>
            Cancel
          </Button>
        ) : (
          <Button type="text" size="sm" onClick={handlePrev}>
            Back
          </Button>
        )}
        {showQuestion < 3 ? (
          <Button type="text" size="sm" onClick={handleNext}>
            Next
          </Button>
        ) : (
          <Button type="text" size="sm" onClick={handleSubmit}>
            Submit
          </Button>
        )}
      </div>
    </Modal>
  );
};

export default Questionnaire;
