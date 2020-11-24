import React, { useRef } from "react";

import { Button } from "../../../../../components/UI/Button/Button";
import TextForm from "../../../../../components/UI/TextForm/TextForm";

import useClickOutside from "../../../../../hooks/useClickOutside";

import "./PromoInput.scss";

const PromoInput = ({
  value,
  inputChangeHandler,
  submitClickHandler,
  closeHandler,
}) => {
  const promoInputRef = useRef();

  useClickOutside(promoInputRef, closeHandler);

  return (
    <div className="promo-input" ref={promoInputRef}>
      <TextForm
        id="promo"
        placeholder="Promo"
        value={value}
        inputHandler={inputChangeHandler}
      />
      <Button className="promo-submit" size="sm" onClick={submitClickHandler}>
        Submit
      </Button>
    </div>
  );
};

export default PromoInput;
