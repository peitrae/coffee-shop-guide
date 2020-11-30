import React, { useContext } from "react";

import { FunctionContext } from "../../UpdateCoffeeShop";

import InputField from "../../../../components/UI/InputField/InputField";

import "./Contact.scss";

const Contact = ({ value = "0" }) => {
  const { onInputChange } = useContext(FunctionContext);

  return (
    <div className="contact">
      <label className="information-label">Contact</label>
      <InputField
        value={value}
        onChange={onInputChange("contact")}
        placeholder="Rp"
      />
    </div>
  );
};

export default Contact;
