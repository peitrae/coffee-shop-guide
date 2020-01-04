import React, { useState } from "react";
import { useSelector } from "react-redux";

import SignUp from "../../components/Auth/SignUp/SignUp";
import { BtnLarge } from "../../components/UI/Button/Button";
import classes from "./Homepage.module.css";

import Preference from "./Preference/Preference";

const Homepage = props => {
  const [showPreference, setShowPreference] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const userData = useSelector(state => state.member);

  const authenticated = userData.token !== null;
  const { localId, token, preference } = userData;

  const preferenceCancelHandler = () => setShowPreference(false);

  const authCancelHandler = () => setShowSignUp(false);

  const searchContinueHandler = () => {
    preference ? props.history.push("/search") : setShowPreference(true);
  };

  let button = <BtnLarge clicked={() => setShowSignUp(true)}>Sign Up</BtnLarge>;
  if (authenticated) {
    button = <BtnLarge clicked={searchContinueHandler}>Search</BtnLarge>;
  }

  return (
    <div className={classes.Homepage}>
      {showSignUp ? (
        <SignUp show={showSignUp} close={authCancelHandler} auth={showSignUp} />
      ) : null}
      <h1 className={classes.Header}>Find the best coffee shop in Malang</h1>
      <div className={classes.BtnFind}>{button}</div>
      {showPreference ? (
        <Preference
          show={showPreference}
          close={preferenceCancelHandler}
          localId={localId}
          token={token}
        />
      ) : null}
    </div>
  );
};

export default Homepage;
