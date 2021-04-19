import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Button } from "../../../../components/UI/Button";
import envelopeIco from "../../../../assets/logo/envelope.png";
import Modal from "../../../../components/UI/Modal";
import * as actions from "../../../../store/actions/member";

import "./SendVerification.scss";

const SendVerification = ({ handleClose }) => {
  const dispatch = useDispatch();

  const [timeleft, setTimeleft] = useState(60);

  const emailVerified = useSelector(({ member }) => member.emailVerified);

  const handleResend = () => {
    setTimeleft(60);
    dispatch(actions.sendVerification());
  };

  useEffect(() => {
    dispatch(actions.sendVerification());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!timeleft) return;

    const countDown = setInterval(() => {
      setTimeleft(timeleft - 1);
    }, 1000);

    return () => clearInterval(countDown);
  }, [timeleft]);

  return (
    <Modal className="verification" handleClose={handleClose}>
      <h1 className="h1 c-primary">{"Verify your email"}</h1>
      <img src={envelopeIco} alt="email" className="verification__image" />
      <span className="verification__text">
        Check your email for a verification link
      </span>
      <div>
        {!emailVerified && timeleft ? (
          <Button disabled={true}>{`${timeleft}s`}</Button>
        ) : (
          <Button onClick={handleResend}>Resend</Button>
        )}
      </div>
    </Modal>
  );
};

export default SendVerification;
