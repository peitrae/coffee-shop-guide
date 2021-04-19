import React from "react";

import Card from "../Card";
import Backdrop from "../Backdrop";

import { CloseCircleButton } from "../Button";

const Modal = ({ children, className, handleClose = () => {} }) => {
  return (
    <>
      <Backdrop className="modal__backdrop" onClick={handleClose} />
      <Card className={`modal ${className}`}>
        <CloseCircleButton className="modal__close" onClick={handleClose} />
        {children}
      </Card>
    </>
  );
};

export default Modal;
