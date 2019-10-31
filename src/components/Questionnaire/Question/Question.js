import React from "react";

import RadioButton from "../../UI/Button/RadioButton/RadioButton";
import classes from "./Question.module.css";

const Question = props => {
  const { question, label, showQuestion, clicked, checked, typePrice } = props;
  return (
    <React.Fragment>
      <span className={classes.Question}>{question}</span>
      <div className={classes.FormInput}>
        {label.map(element => (
          <RadioButton
            key={element.label}
            inputId={showQuestion}
            clicked={clicked}
            label={element.label}
            value={element.value}
            checked={checked === element.value}
            radioButtonType={showQuestion !== typePrice ? "Rectangle" : null}
          />
        ))}
      </div>
    </React.Fragment>
  );
};

export default Question;
