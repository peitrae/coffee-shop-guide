import React from "react";

import RadioButton from "../../../../../components/UI/Button/RadioButton/RadioButton";
import BubbleBox from "../../../../../components/UI/BubbleBox/BubbleBox";

import "./PriceGroup.scss";

const PriceGroup = ({ onClick, checked, onClickOutside }) => {
  return (
    <BubbleBox className="price-filter-grp" onClickOutside={onClickOutside}>
      <RadioButton
        name="belowTen"
        onClick={() => onClick("belowTen")}
        checked={checked === "belowTen"}
        size="sm"
      >
        {"< 10K"}
      </RadioButton>
      <RadioButton
        name="tenTillThirty"
        onClick={() => onClick("tenTillThirty")}
        checked={checked === "tenTillThirty"}
        size="sm"
      >
        {"10K - 30K"}
      </RadioButton>
      <RadioButton
        name="thirtyTillFifty"
        onClick={() => onClick("thirtyTillFifty")}
        checked={checked === "thirtyTillFifty"}
        size="sm"
      >
        {"30K - 50K"}
      </RadioButton>
      <RadioButton
        name="aboveFifty"
        onClick={() => onClick("aboveFifty")}
        checked={checked === "aboveFifty"}
        size="sm"
      >
        {"> 50K"}
      </RadioButton>
    </BubbleBox>
  );
};

export default PriceGroup;
