import React, { useState } from "react";

import Modal from "../UI/Modal/Modal";
import Question from "./Question/Question";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { BtnMediumText } from "../UI/Button/Button";
import classes from "./Questionnaire.module.css";

const Questionnaire = props => {
  const [showQuestion, setShowQuestion] = useState(0);

  const {
    questions,
    show,
    close,
    header,
    submitHandler,
    label,
    priceLabelRadio,
    typePrice,
    answers,
    setAnswers,
    errorMessage
  } = props;

  const nextQuestionHandler = () => setShowQuestion(showQuestion + 1);

  const prevQuestionHandler = () => setShowQuestion(showQuestion - 1);

  const radioInputHandler = event => {
    let arrayCopy = [...answers];
    let indexQuestion = event.target.name;
    let choice = parseInt(event.target.value);
    arrayCopy[indexQuestion] = choice;
    setAnswers(arrayCopy);
  };

  return (
    <Modal
      modalType={classes.Questionnaire}
      header={header}
      show={show}
      close={close}
    >
      {errorMessage ? <ErrorMessage message={errorMessage} /> : null}
      <form
        id="questionnaire"
        className={classes.QuestionDiv}
        onSubmit={submitHandler}
      >
        <Question
          question={questions[showQuestion]}
          showQuestion={showQuestion}
          clicked={radioInputHandler}
          checked={answers[showQuestion]}
          label={showQuestion === typePrice ? priceLabelRadio : label}
          typePrice={typePrice}
        />
      </form>
      <div className={classes.Controller}>
        {showQuestion 
          ? <BtnMediumText clicked={prevQuestionHandler}>Previous</BtnMediumText>
          : <BtnMediumText clicked={close}>Back</BtnMediumText>
        }
        
        {showQuestion < questions.length - 1 ? (
          <BtnMediumText clicked={nextQuestionHandler}>Next</BtnMediumText>
        ) : (
          <BtnMediumText clicked={submitHandler}>Finish</BtnMediumText>
        )}
      </div>
    </Modal>
  );
};

export default Questionnaire;
