import React from "react";

import InputField from "../../../../../../components/UI/InputField/InputField";

const Contact = ({ value = "", onChange = () => {} }) => (
  <div className="col margin-v-8">
    <label className="add-coffeeshop__label">Contact</label>
    <InputField
      name="contact"
      value={value}
      onChange={onChange}
      placeholder="Contact"
      size="sm"
    />
  </div>
);

export default Contact;
