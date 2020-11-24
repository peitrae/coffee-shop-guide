import React, { useState } from "react";

import PromoItem from "./PromoItem/PromoItem";
import PromoEdit from "./PromoEdit/PromoEdit";

import "./Promo.scss";

const Promo = ({ promoId, value, coffeeShopId, deleteHandler, setError }) => {
  const [showEdit, setShowEdit] = useState(false);

  const showEditClickHandler = () => setShowEdit(!showEdit);

  const deleteClickHandler = () => deleteHandler(promoId);

  return showEdit ? (
    <PromoEdit
      value={value}
      promoId={promoId}
      coffeeShopId={coffeeShopId}
      closeHandler={showEditClickHandler}
      setError={setError}
    />
  ) : (
    <PromoItem
      value={value}
      showEditClickHandler={showEditClickHandler}
      deleteClickHandler={deleteClickHandler}
    />
  );
};

export default Promo;
