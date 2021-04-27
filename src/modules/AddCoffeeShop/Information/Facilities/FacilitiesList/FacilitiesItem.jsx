import React from "react";

import { CloseCircleButton } from "../../../../../components/UI/Button";

const FacilitiesItem = ({ children, handleDelete }) => (
  <div className="facilities__item">
    {children}
    <CloseCircleButton
      onClick={handleDelete}
      className="facilities__btn-delete margin-l-6"
    />
  </div>
);

export default FacilitiesItem;
