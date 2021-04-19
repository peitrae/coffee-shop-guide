import React from "react";

import { Button } from "../../../../../../../../../../components/UI/Button";
import InputField from "../../../../../../../../../../components/UI/InputField/InputField";

const FacilitiesInput = ({ value, onChange, handleSubmit }) => (
  <div className="add-facilities__input-grp">
    <InputField
      placeholder="Others"
      size="sm"
      value={value}
      onChange={onChange}
    />
    <Button size="sm" className="margin-l-6" onClick={handleSubmit}>
      Add
    </Button>
  </div>
);

export default FacilitiesInput;
