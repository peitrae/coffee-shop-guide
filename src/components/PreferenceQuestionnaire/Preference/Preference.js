import React from "react";

import Modal from "../../UI/Modal/Modal";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import { BtnMediumText } from "../../UI/Button/Button";
import RadioButton from "../../UI/Button/RadioButton/RadioButton";

import "./Preference.scss";

const Questionnaire = (props) => {
  const {
    question,
    label,
    checked,
    errorMessage,
    nextQuestionHandler,
    prevQuestionHandler,
    showQuestion,
    preferenceClickHandler,
    closePreferenceHandler,
    submitClickHandler,
  } = props;

  return (
    <Modal
      classes="preference-questionnaire"
      show={true}
      close={closePreferenceHandler}
    >
      <h1 className="preference-questionnaire-title">Your Preference</h1>
      {errorMessage ? (
        <ErrorMessage
          className="preference-questionnaire-error"
          message={errorMessage}
        />
      ) : null}
      <form className="preference-questionnaire-form">
        <span className="form-question">{question}</span>
        <div className="form-radio-grp">
          {label.map((element) => (
            <RadioButton
              key={element.label}
              name={showQuestion}
              onClick={preferenceClickHandler}
              value={element.value}
              checked={checked === element.value}
              className="form-radio"
            >
              {element.label}
            </RadioButton>
          ))}
        </div>
      </form>
      <div className="preference-questionnaire-controls">
        {showQuestion === 0 ? (
          <BtnMediumText clicked={closePreferenceHandler}>Cancel</BtnMediumText>
        ) : (
          <BtnMediumText clicked={prevQuestionHandler}>Back</BtnMediumText>
        )}
        {showQuestion === 0 ? (
          <BtnMediumText clicked={nextQuestionHandler}>Next</BtnMediumText>
        ) : (
          <BtnMediumText clicked={submitClickHandler}>Submit</BtnMediumText>
        )}
      </div>
    </Modal>
  );
};

export default Questionnaire;
