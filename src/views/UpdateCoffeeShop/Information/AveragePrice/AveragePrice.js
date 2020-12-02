import React, { useContext } from "react";

import { FunctionContext } from "../../UpdateCoffeeShop";

import InputField from "../../../../components/UI/InputField/InputField";

import "./AveragePrice.scss";

const AveragePrice = ({ value = "0" }) => {
  const { onInputChange } = useContext(FunctionContext);

  return (
    <div className="avg-price">
      <label className="information-label">Average Price</label>
      <InputField
        value={value}
        type="number"
        onChange={onInputChange("averagePrice")}
        placeholder="Rp"
      />
    </div>
  );
};

export default AveragePrice;
