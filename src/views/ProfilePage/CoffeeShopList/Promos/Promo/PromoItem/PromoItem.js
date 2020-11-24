import React from "react";

import { PlainBtn } from "../../../../../../components/UI/Button/Button";
import TrashIcon from "../../../../../../assets/icon/TrashIcon";
import PencilIcon from "../../../../../../assets/icon/PencilIcon";

import "./PromoItem.scss";

const PromoItem = ({
  value,
  showEditClickHandler,
  deleteClickHandler,
}) => (
  <div className="owner-promo-item">
    <span className="item-value">{value}</span>
    <div className="item-controls">
      <PlainBtn className="item-edit" onClick={showEditClickHandler}>
        <PencilIcon />
      </PlainBtn>
      <PlainBtn
        className="item-delete"
        onClick={deleteClickHandler}
      >
        <TrashIcon />
      </PlainBtn>
    </div>
  </div>
);

export default PromoItem;
