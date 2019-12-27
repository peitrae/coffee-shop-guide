import React from "react";

import Modal from "../../../../components/UI/Modal/Modal";
import { BtnMedium, BtnMediumText } from "../../../../components/UI/Button/Button";
import classes from "./WarningModal.module.css";

const WarningModal = props => {
  return (
    <Modal
      show={props.show}
      close={props.cancelHandler}
      header={"Warning"}
      small
    >
      <p className={classes.Desc}>
        Are you sure want to delete the coffee shop?
      </p>
      <div className={classes.BtnGroup}>
        <BtnMedium btnType="Green" clicked={props.cancelHandler}>
          Back
        </BtnMedium>
        <BtnMediumText btnType="DangerText" clicked={props.submitWarningHandler}>
          Delete
        </BtnMediumText>
      </div>
    </Modal>
  );
};

export default WarningModal;
