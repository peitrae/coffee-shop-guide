import React, { useState } from "react";

import Modal from "../UI/Modal/Modal";
import Question from "./Question/Question";
import classes from "./Questionnaire.module.css";

const Questionnaire = props => {
  const [answerRadio, setAnswerRadio] = useState([0, 0, 0, 0]); // Move to parent
  const [showQuestion, setShowQuestion] = useState(0);

  const {
    questions,
    show,
    close,
    header,
    submitAction,
    label,
    priceLabel,
    typePrice
  } = props;

  const nextQuestionHandler = event => {
    event.preventDefault();
    if (showQuestion < questions.length) setShowQuestion(showQuestion + 1);
  };

  const prevQuestionHandler = () => {
    showQuestion > 0 ? setShowQuestion(showQuestion - 1) : close();
  };

  const radioInputHandler = event => {
    let arrayCopy = [...answerRadio];
    let indexQuestion = event.target.name;
    let choice = parseInt(event.target.value);
    arrayCopy[indexQuestion] = choice;
    setAnswerRadio(arrayCopy);
  };

  const submitHandler = event => {
    event.preventDefault();
    submitAction(answerRadio);
  };

  return (
    <Modal
      modalType={classes.Questionnaire}
      header={header}
      show={show}
      close={close}
    >
      <form
        id="questionnaire"
        className={classes.QuestionDiv}
        onSubmit={submitHandler}
      >
        <Question
          question={questions[showQuestion]}
          showQuestion={showQuestion}
          clicked={radioInputHandler}
          checked={answerRadio[showQuestion]}
          label={showQuestion === typePrice ? priceLabel : label}
          typePrice={typePrice}
        />
      </form>
      <button onClick={prevQuestionHandler}>Previous</button>
      {showQuestion < questions.length - 1 ? (
        <button className={classes.BtnFinish} onClick={nextQuestionHandler}>
          Next
        </button>
      ) : (
        <button
          type="submit"
          form="questionnaire"
          className={classes.BtnFinish}
        >
          Finish
        </button>
      )}
    </Modal>
  );
};

export default Questionnaire;
