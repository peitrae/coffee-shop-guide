import React, { useState } from "react";
import { useDispatch } from "react-redux";

import PromoInput from "../../PromoInput/PromoInput";

import * as actions from "../../../../../../store/actions/index";

const PromoEdit = ({
  value,
  promoId,
  coffeeShopId,
  closeHandler,
  setError,
}) => {
  const dispatch = useDispatch();

  const [promo, setPromo] = useState(value);

  const inputChangeHandler = (e) => setPromo(e.target.value);

  const submitEditClickHandler = () => {
    if (promo !== "") {
      dispatch(actions.editCoffeeShopPromo(promo, promoId, coffeeShopId));
      closeHandler();
    } else {
      setError("Password is empty");
    }
  };

  return (
    <div className="owner-promo-edit">
      <PromoInput
        value={promo}
        closeHandler={closeHandler}
        inputChangeHandler={inputChangeHandler}
        submitClickHandler={submitEditClickHandler}
      />
    </div>
  );
};

export default PromoEdit;
