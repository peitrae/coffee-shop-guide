import React, { useState } from "react";
import { useSelector } from "react-redux";

import SignUp from "../../components/Auth/SignUp/SignUp";
import { BtnLarge } from "../../components/UI/Button/Button";
import style from "./Homepage.module.css";

import Preference from "./Preference/Preference";

const Homepage = props => {
  const [showPreference, setShowPreference] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const userData = useSelector(state => state.member)

  const authenticated = userData.token !== null
  const {localId, token, preference} = userData

  const preferenceCancelHandler = () => setShowPreference(false);

  const authCancelHandler = () => setShowSignUp(false);

  const searchContinueHandler = () => {
    preference ? props.history.push("/search") : setShowPreference(true);
  };

  let button = (
    <BtnLarge btnName="Sign Up" clicked={() => setShowSignUp(true)} />
  );
  if (authenticated) {
    button = <BtnLarge btnName="Search" clicked={searchContinueHandler} />;
  }

  return (
    <div className={style.Homepage}>
      {showSignUp ? (
        <SignUp show={showSignUp} close={authCancelHandler} auth={showSignUp} />
      ) : null}
      <h1 className={style.Header}>Find the best coffee shop in Malang</h1>
      <div className={style.BtnFind}>{button}</div>
      {showPreference ? (
        <Preference show={showPreference} close={preferenceCancelHandler} localId={localId} token={token}/>
      ) : null}
    </div>
  );
};

export default Homepage;
