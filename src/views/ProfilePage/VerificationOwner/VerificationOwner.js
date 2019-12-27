import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import classes from "./VerificationOwner.module.css";
import { BtnMedium } from "../../../components/UI/Button/Button";
import envelopeIco from "../../../assets/logo/envelope.png";
import Modal from "../../../components/UI/Modal/Modal";
import * as actions from "../../../store/actions/member";

const VerificationOwner = props => {
  const [timeLeft, setTimeLeft] = useState(60);

  const emailVerified = useSelector(state => state.member.emailVerified);
  const dispatch = useDispatch();
  const toBeOwner = () => dispatch(actions.sendVerification());

  const resendEmail = () => {
    setTimeLeft(60);
    toBeOwner();
  };

  useEffect(() => {
    if (!timeLeft) return;

    const countDown = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(countDown);
  }, [timeLeft]);

  return (
    <Modal
      modalType={classes.Verification}
      show={props.show}
      close={props.close}
    >
      <h1 className={classes.Header}>{"Verify your email"}</h1>
      <img src={envelopeIco} alt="email" className={classes.EnvelopeIco} />
      <span className={classes.Desc}>
        Check your email for a verification link
      </span>
      <div className={classes.Btn}>
        {emailVerified ? null : timeLeft ? (
          <BtnMedium btnType="Disabled">{`${timeLeft}s`}</BtnMedium>
        ) : (
          <BtnMedium btnType="Green" clicked={resendEmail}>
            Resend
          </BtnMedium>
        )}
      </div>
    </Modal>
  );
};

export default VerificationOwner;
