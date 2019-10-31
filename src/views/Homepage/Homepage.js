import React, { useState } from "react";

import style from "./Homepage.module.css";
import { BtnLarge } from "../../components/UI/Button/Button";
import { GET_AUTH_TOKEN } from "../../shared/utility";
import SignUp from "../../components/Auth/SignUp/SignUp";
import Login from "../../components//Auth/Login/Login";

const Homepage = props => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const searchContinueHandler = () => {
    props.history.push("/search");
  };

  const authCancelHandler = () => {
    setIsSignUp(false);
    setIsLogin(false);
  }

  console.log("SignUp",isSignUp);

  let button = <BtnLarge btnName="Buat Akun" clicked={() => setIsSignUp(true)} />;
  GET_AUTH_TOKEN &&
    (button = <BtnLarge btnName="Temukan" clicked={searchContinueHandler} />);

  return (
    <div className={style.Homepage}>
      {isSignUp && <SignUp show={isSignUp} clicked={authCancelHandler} auth={isSignUp}/>}
      {isLogin && <Login show={isLogin} clicked={authCancelHandler}/>}
      <h1 className={style.Header}>Temukan kedai kopi terbaik di Malang</h1>
      <div className={style.BtnFind}>{button}</div>
    </div>
  );
};

export default Homepage;
