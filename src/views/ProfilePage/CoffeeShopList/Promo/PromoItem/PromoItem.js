import React from "react";

import { PlainBtn } from "../../../../../components/UI/Button/Button";

import TrashIcon from "../../../../../assets/icon/TrashIcon";

import "./PromoItem.scss";

const PromoItem = ({ promoId, value, deleteClickHandler }) => (
  <div className="edit-promo-item">
    <span className="promo-main">{value}</span>
    <PlainBtn className="promo-delete" onClick={() => deleteClickHandler(promoId)}>
      <TrashIcon />
    </PlainBtn>
  </div>
);

export default PromoItem;
