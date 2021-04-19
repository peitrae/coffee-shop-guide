import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

import Question from "./components/Question";
import * as actions from "../../store/actions/member";

const AddPreference = ({
  redirectTo,
  handleClose,
  oldPreference = [0, 0, 0, 0],
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const type = {
    0: {
      question: "Location accessibility",
      options: [
        { label: "1 Km", value: 1 },
        { label: "3 Km", value: 2 },
        { label: "5 Km", value: 3 },
        { label: "10 Km", value: 4 },
        { label: "> 10 Km", value: 5 },
      ],
    },
    1: {
      question: "What is your coffee shop price range preference?",
      options: [
        { label: "< 10K", value: 1 },
        { label: "10K - 30K", value: 2 },
        { label: "30K - 50K", value: 3 },
        { label: "> 50K", value: 4 },
      ],
    },
    2: {
      question: "From scale 1 to 5, what is your preference of the taste of the coffee?",
      options: [
        { label: "1", value: 1 },
        { label: "2", value: 2 },
        { label: "3", value: 3 },
        { label: "4", value: 4 },
        { label: "5", value: 5 },
      ],
    },
    3: {
      question: "From scale 1 to 5, what is your preference of presentation of the coffee?",
      options: [
        { label: "1", value: 1 },
        { label: "2", value: 2 },
        { label: "3", value: 3 },
        { label: "4", value: 4 },
        { label: "5", value: 5 },
      ],
    },
  };

  const [showQuestion, setShowQuestion] = useState(0);
  const [preference, setPreference] = useState(oldPreference);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (preference.indexOf(0) === -1) {
      dispatch(actions.setPreference(preference));
      redirectTo ? history.push(redirectTo) : handleClose();
    } else {
      setError("Fill all questionnaire");
    }
  };

  const handleRadioClick = (e) => {
    const temp = [...preference];
    temp[e.target.name] = parseInt(e.target.value);
    setPreference(temp);
  };

  const handleNext = () => setShowQuestion(showQuestion + 1);

  const handlePrev = () => setShowQuestion(showQuestion - 1);

  return (
    <Question
      showQuestion={showQuestion}
      type={type}
      checked={preference[showQuestion]}
      error={error}
      handleNext={handleNext}
      handlePrev={handlePrev}
      handleRadioClick={handleRadioClick}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
    />
  );
};

export default AddPreference;

// From scale 1 to 5, how much your preference of the taste of the coffee?
// From scale 1 to 5, how much do you like the presentation of the coffee?
// From scale 1 to 5, how much do you like the coffee shop?

// From this coffee shop, which coffee do you like better?
