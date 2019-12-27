import React from "react";

import RadioButton from "../../../../components/UI/Button/RadioButton/RadioButton";
import Card from "../../../../components/UI/Card/Card";
import classes from "./PriceRadioBtnGroup.module.css"

const PriceRadioBtnGroup = props => {
  const { clicked, checked, className } = props
  const style = [classes.RadioButtonGroup, [className]].join(' ')
  return(
  <Card className={style}>
    <RadioButton
      inputId={"belowTen"}
      clicked={() => clicked("belowTen")}
      label={"< 10K"}
      checked={checked === "belowTen"}
      radioButtonType="Small"
    />
    <RadioButton
      inputId={"tenTillThirty"}
      clicked={() => clicked("tenTillThirty")}
      label={"10K - 30K"}
      checked={checked === "tenTillThirty"}
      radioButtonType="Small"
    />
    <RadioButton
      inputId={"thirtyTillFifty"}
      clicked={() => clicked("thirtyTillFifty")}
      label={"30K - 50K"}
      checked={checked === "thirtyTillFifty"}
      radioButtonType="Small"
    />
    <RadioButton
      inputId={"aboveFifty"}
      clicked={() => clicked("aboveFifty")}
      label={"> 50K"}
      checked={checked === "aboveFifty"}
      radioButtonType="Small"
    />
  </Card>
)};

export default PriceRadioBtnGroup;
