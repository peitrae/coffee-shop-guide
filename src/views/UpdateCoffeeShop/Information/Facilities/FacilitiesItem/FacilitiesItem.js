import React from "react";

import { ReactComponent as CloseIcon } from "../../../../../assets/svg/close.svg";
import { Button } from "../../../../../components/UI/Button/Button";

import "./FacilitiesItem.scss";

const FacilitiesItem = ({ children, onDelete }) => (
  <div className="list-item">
    {children}
    <Button size="sm" className="close-button" onClick={onDelete}>
      <CloseIcon />
    </Button>
  </div>
);

export default FacilitiesItem;
