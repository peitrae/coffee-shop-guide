import React from "react";

import Modal from "../../../../components/UI/Modal/Modal";
import { Button } from "../../../../components/UI/Button/Button";

import "./WarningModal.scss";

const WarningModal = ({ message, submitHandler, closeHandler }) => {
  return (
    <Modal
      show={true}
      close={closeHandler}
      small
      danger
      className="warning-modal"
    >
      <h1 className="warning-modal-header">Delete</h1>
      <p className="warning-modal-text">{message}</p>
      <div className="warning-modal-controls">
        <Button color="danger" onClick={submitHandler}>
          Delete
        </Button>
        <Button type="text" color="secondary" onClick={closeHandler}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default WarningModal;
