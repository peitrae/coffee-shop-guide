import React from "react";

import InputField from "../../../components/UI/InputField/InputField";

const AveragePrice = ({ value = "", onChange = () => {} }) => (
  <div className="col margin-v-8">
    <label className="add-coffeeshop__label">Harga Rata - Rata</label>
    <InputField
      name="averagePrice"
      value={value}
      type="number"
      onChange={onChange}
      placeholder="Rp"
      size="sm"
    />
  </div>
);

export default AveragePrice;
