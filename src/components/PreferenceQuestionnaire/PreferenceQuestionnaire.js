import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Preference from "./Preference/Preference";
import * as actions from "../../store/actions/member";

const PreferenceQuestionnaire = ({ closeClickHandler, onSubmit }) => {
  const dispatch = useDispatch();

  const [showQuestion, setShowQuestion] = useState(0);
  const [preference, setPreference] = useState([0, 0, 0, 0]);
  const [errorMessage, setErrorMessage] = useState(null);

  const userPreference = useSelector((state) => state.member.preference);

  useEffect(() => {
    if (userPreference) {
      setPreference(userPreference);
    }
  }, [userPreference]);

  const preferenceQuestions = [
    "How important taste and quality of product of coffee shop for you?",
    "How important order/delivery process of coffee shop for you?",
    "How important overall rating of coffee shop for you?",
    "What is your coffee shop price range prefeference?",
  ];

  const preferenceOpts = [
    { label: "Not at all important", value: 1 },
    { label: "Slightly important", value: 2 },
    { label: "Important", value: 3 },
    { label: "Fairly important", value: 4 },
    { label: "Very important", value: 5 },
  ];

  const priceOpts = [
    { label: "< 10K", value: 1 },
    { label: "10K - 30K", value: 2 },
    { label: "30K - 50K", value: 3 },
    { label: "> 50K", value: 4 },
  ];

  function submitClickHandler(event) {
    event.preventDefault();
    if (preference.indexOf(0) === -1) {
      dispatch(actions.setPreference(preference));
      onSubmit ? onSubmit() : closeClickHandler();
    } else {
      setErrorMessage("Fill all questionnaire");
    }
  }

  const preferenceClickHandler = (event) => {
    const temp = [...preference];
    const indexQuestion = event.target.name;
    const choice = parseInt(event.target.value);
    temp[indexQuestion] = choice;
    setPreference(temp);
  };

  const nextQuestionHandler = () => setShowQuestion(showQuestion + 1);

  const prevQuestionHandler = () => setShowQuestion(showQuestion - 1);

  return (
    <Preference
      question={preferenceQuestions[showQuestion]}
      label={showQuestion < 3 ? preferenceOpts : priceOpts}
      checked={preference[showQuestion]}
      errorMessage={errorMessage}
      showQuestion={showQuestion}
      nextQuestionHandler={nextQuestionHandler}
      prevQuestionHandler={prevQuestionHandler}
      closePreferenceHandler={closeClickHandler}
      preferenceClickHandler={preferenceClickHandler}
      submitClickHandler={submitClickHandler}
    />
  );
};

export default PreferenceQuestionnaire;
