import React from "react";

const RatingRadioButton = ({ item, isChecked, name, onClick }) => (
  <label
    key={item.value}
    className={`add-review__btn-radio ${
      isChecked ? "add-review__btn-radio--active" : null
    }`}
  >
    <input
      type="radio"
      name={name}
      value={item.value}
      onClick={onClick}
      checked={isChecked}
      readOnly
      className="input--hide"
    />
    {item.icon}
  </label>
);

export default RatingRadioButton;
