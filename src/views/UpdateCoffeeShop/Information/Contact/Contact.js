import React, { useContext } from "react";

import { FunctionContext } from "../../UpdateCoffeeShop";

import InputField from "../../../../components/UI/InputField/InputField";

import "./Contact.scss";

const Contact = ({ value }) => {
  const { onChangeInput } = useContext(FunctionContext);

  return (
    <div className="contact">
      <label className="information-label">Contact</label>
      <InputField
        value={value || ""}
        onChange={onChangeInput("contact")}
        placeholder="Contact"
      />
    </div>
  );
};

export default Contact;
