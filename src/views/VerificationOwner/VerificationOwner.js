import React from "react";
import Card from "../../components/UI/Card/Card";
import classes from "./VerificationOwner.module.css";
import { BtnMedium } from "../../components/UI/Button/Button";
import envelopeIco from "../../assets/logo/envelope.png";
import frameIco from "../../assets/logo/frame.png";

const VerificationOwner = props => {
  const status = true; // change this with props
  let header = "Verifikasi Email";
  let icon = envelopeIco;
  let desc = "Verifikasi email yang kami kirimkan untuk menjadi owner";

  if (status) {
    header = "Tunggu Verifikasi";
    icon = frameIco;
    desc = "Tunggu pengajuanmu diverifikasi oleh kami";
  }

  console.log(header);

  return (
    <Card cardType={classes.Verification} >
      <h1 className={classes.Header}>{header}</h1>
      <img src={icon} alt="email" className={classes.EnvelopeIco} />
      <span className={classes.Desc}>{desc}</span>
      <div className={classes.Btn}>
        <BtnMedium btnName="Kembali" btnType="Green" />
      </div>
    </Card>
  );
};

export default VerificationOwner;
