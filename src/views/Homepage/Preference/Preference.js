import React, { useState } from "react"; 
import { useDispatch} from "react-redux";
import { withRouter } from "react-router";

import Questionnaire from "../../../components/Questionnaire/Questionnaire";
import * as actions from "../../../store/actions/member";

const Preference = props => {

  console.log(props.localId)
  console.log(props.token)

  const [preference, setPreference] = useState([0, 0, 0, 0]);

  const dispatch = useDispatch();
  const setUserPreference = (preference, localId, token) =>
    dispatch(actions.setPreference(preference, localId, token));

  const preferenceQuestions = [
    "What is your taste and quality of product of coffee shop rating preference?",
    "What is your order/delivery process of coffee shop rating preference?",
    "What is your overall rating of coffee shop preference?",
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

  const submitHandler = event => {
    event.preventDefault()
    setUserPreference(preference, props.localId, props.token);
    props.history.push("/search")
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
      priceLabel={priceLabelRadio}
      typePrice={3} // questionnaireQuestions[3]
    />
  );
};

export default withRouter(Preference);
