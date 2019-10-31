import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Card from "../../components/UI/Card/Card";
import classes from "./VerificationOwner.module.css";
import { BtnMedium } from "../../components/UI/Button/Button";
import envelopeIco from "../../assets/logo/envelope.png";
import frameIco from "../../assets/logo/frame.png";
import * as actions from "../../store/actions/member";

const VerificationOwner = props => {
  const [timeLeft, setTimeLeft] = useState(60);

  const { emailSent, emailVerified } = props.getUserData;
  const { toBeOwner } = props;

  let header = "Verifikasi Email";
  let icon = envelopeIco;
  let desc = `Kirim ulang email dalam ${timeLeft} detik`;

  if (emailVerified) {
    header = "Tunggu Verifikasi";
    icon = frameIco;
    desc = "Tunggu pengajuanmu diverifikasi oleh kami";
  }

  const backToProfile = () => {
    props.history.push("/profile");
  };

  const resendEmail = () => {
    setTimeLeft(60);
    toBeOwner();
  };

  console.log("emailSent", emailSent);
  console.log("emailVerified", !emailVerified);

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

const mapStateToProps = state => {
  return {
    getUserData: state.member
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toBeOwner: () => dispatch(actions.sendVerification())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VerificationOwner);
