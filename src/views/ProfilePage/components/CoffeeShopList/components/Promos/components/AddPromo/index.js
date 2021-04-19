import React, { useRef } from "react";

import { Button } from "../../../../../../../../components/UI/Button";
import InputField from "../../../../../../../../components/UI/InputField/InputField";

import useClickOutside from "../../../../../../../../hooks/useClickOutside";

const AddPromo = ({ value, handleChangeInput, handleSubmit, handleClose }) => {
  const promoInputRef = useRef();
  useClickOutside(promoInputRef, handleClose);

  return (
    <div className="col" ref={promoInputRef}>
      <InputField
        size="sm"
        placeholder="Promo"
        value={value}
        onChange={handleChangeInput}
        className="margin-r-6"
      />
      <Button size="sm" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
};

export default AddPromo;
