import React from "react";

import Modal from "../../../../../../components/UI/Modal";
import { Button } from "../../../../../../components/UI/Button";

const WarningModal = ({ message, handleSubmit, handleClose }) => (
  <Modal handleClose={handleClose} className="warning-modal">
    <h1 className="warning-modal__title">Hapus</h1>
    <p className="warning-modal__text">{message}</p>
    <div className="warning-modal__actions">
      <Button color="danger" onClick={handleSubmit}>
        Hapus
      </Button>
      <Button
        type="text"
        color="secondary"
        onClick={handleClose}
        className="margin-l-12"
      >
        Batal
      </Button>
    </div>
  </Modal>
);

export default WarningModal;
