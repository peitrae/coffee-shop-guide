import React, { forwardRef } from "react";

import { Button } from "../../../../../components/UI/Button/Button";
import TextForm from "../../../../../components/UI/TextForm/TextForm";

import "./PromoInput.scss";

const PromoInput = forwardRef(
  ({ value, textChangeHandler, submitClickHandler }, ref) => (
    <div className="edit-promo-input" ref={ref}>
      <TextForm
        id="promo"
        placeholder="Promo"
        value={value}
        inputHandler={textChangeHandler}
      />
      <Button className="submit-btn" onClick={submitClickHandler}>
        Add
      </Button>
    </div>
  )
);

export default PromoInput;
