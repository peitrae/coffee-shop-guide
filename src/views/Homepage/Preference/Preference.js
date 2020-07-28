import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router";

import Questionnaire from "../../../components/Questionnaire/Questionnaire";
import * as actions from "../../../store/actions/member";

const Preference = props => {
  const [preference, setPreference] = useState([0, 0, 0, 0]);
  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();
  const setUserPreference = preference =>
    dispatch(actions.setPreference(preference));

  const preferenceQuestions = [
    "How important taste and quality of product of coffee shop rating preference for you?",
    "How important order/delivery process of coffee shop rating preference for you?",
    "How important overall rating of coffee shop preference for you?",
    "What is your coffee shop price range prefeference ?"
  ];

  const defaultLabelRadio = [
    { label: 1, value: 1 },
    { label: 2, value: 2 },
    { label: 3, value: 3 },
    { label: 4, value: 4 },
    { label: 5, value: 5 }
  ];

  const priceLabelRadio = [
    { label: "< 10K", value: 1 },
    { label: "10K - 30K", value: 2 },
    { label: "30K - 50K", value: 3 },
    { label: "> 50K", value: 4 }
  ];

  function submitHandler (event) {
    event.preventDefault();
    if (preference.indexOf(0) === -1) {
      setUserPreference(preference, props.localId);
      props.history.push("/search");
    } else {
      setErrorMessage("Fill all questionnaire");
    }
  };

  return (
    <Questionnaire
      questions={preferenceQuestions}
      answers={preference}
      setAnswers={setPreference}
      show={props.show}
      close={props.close}
      header="Your Preference"
      submitHandler={submitHandler}
      label={defaultLabelRadio}
      priceLabelRadio={priceLabelRadio}
      typePrice={3} // questionnaireQuestions[3]
      errorMessage={errorMessage}
    />
  );
};

export default withRouter(Preference);
