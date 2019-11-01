import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Card from "../../components/UI/Card/Card";
import classes from "./VerificationOwner.module.css";
import { BtnMedium } from "../../components/UI/Button/Button";
import envelopeIco from "../../assets/logo/envelope.png";
import frameIco from "../../assets/logo/frame.png";
import * as actions from "../../store/actions/member";

const VerificationOwner = props => {
  const [timeLeft, setTimeLeft] = useState(60);

  const emailVerified = useSelector(state => state.member.emailVerified);
  const dispatch = useDispatch();
  const toBeOwner = () => dispatch(actions.sendVerification());

  let header = "Verifikasi Email";
  let icon = envelopeIco;
  let desc = `Kirim ulang email dalam ${timeLeft} detik`;

  if (emailVerified) {
    header = "Tunggu Verifikasi";
    icon = frameIco;
    desc = "Tunggu pengajuanmu diverifikasi oleh kami";
  }

  const backToProfile = () => props.history.push("/profile");

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
    <Card cardType={classes.Verification}>
      <h1 className={classes.Header}>{header}</h1>
      <img src={icon} alt="email" className={classes.EnvelopeIco} />
      <span className={classes.Desc}>{desc}</span>
      <div className={classes.Btn}>
        <BtnMedium btnName="Kembali" btnType="Green" clicked={backToProfile} />
        {emailVerified ? null : timeLeft ? (
          <BtnMedium btnName="Kirim Ulang" btnType="Disabled" />
        ) : (
          <BtnMedium
            btnName="Kirim Ulang"
            btnType="GreenBorder"
            clicked={resendEmail}
          />
        )}
      </div>
    </Card>
  );
};

export default VerificationOwner;
