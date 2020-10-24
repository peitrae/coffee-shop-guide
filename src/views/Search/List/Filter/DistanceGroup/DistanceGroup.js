import React from "react";

import RadioButton from "../../../../../components/UI/Button/RadioButton/RadioButton";
import BubbleBox from "../../../../../components/UI/BubbleBox/BubbleBox";

import "./DistanceGroup.scss";

const DistanceGroup = ({ onClick, checked, onClickOutside }) => {

  return (
    <BubbleBox className="distance-filter-grp" pos="left" onClickOutside={onClickOutside}>
      <RadioButton
        name="oneKilo"
        onClick={() => onClick(1000)}
        checked={checked === 1000}
        size="sm"
      >
        1 Km
      </RadioButton>
      <RadioButton
        inputId={"fiveKilo"}
        onClick={() => onClick(5000)}
        checked={checked === 5000}
        size="sm"
      >
        5 Km
      </RadioButton>
      <RadioButton
        name={"tenKilo"}
        onClick={() => onClick(10000)}
        checked={checked === 10000}
        size="sm"
      >
        10 Km
      </RadioButton>
    </BubbleBox>
  );
};

export default DistanceGroup;
