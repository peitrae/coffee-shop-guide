import React from "react";

import { PlainBtn } from "../../../../../../../../../../../../components/UI/Button";
import TrashIcon from "../../../../../../../../../../../../assets/icon/TrashIcon";
import PencilIcon from "../../../../../../../../../../../../assets/icon/PencilIcon";

const Promo = ({ value, handleShowEditPromo, handleDeletePromo }) => (
  <div className="promo-item">
    <span className="promo-item__content">{value}</span>
    <div>
      <PlainBtn
        className="promo-item__btn promo-item__btn--edit"
        onClick={handleShowEditPromo}
      >
        <PencilIcon />
      </PlainBtn>
      <PlainBtn
        className="promo-item__btn promo-item__btn--delete"
        onClick={handleDeletePromo}
      >
        <TrashIcon />
      </PlainBtn>
    </div>
  </div>
);

export default Promo;
