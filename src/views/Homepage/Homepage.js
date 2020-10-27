import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import SignUp from "../../components/Auth/SignUp/SignUp";
import { BtnLarge } from "../../components/UI/Button/Button";
import PreferenceQuestionnaire from "../../components/PreferenceQuestionnaire/PreferenceQuestionnaire";
import * as actions from "../../store/actions/member";

import "./Homepage.scss";

const Homepage = ({ history }) => {
  const dispatch = useDispatch();

  const [showPreference, setShowPreference] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const user = useSelector((state) => state.member);

  const authenticated = user.token !== null;

  const showPreferenceHandler = () => setShowPreference(!showPreference);

  const showSignUpHandler = () => setShowSignUp(!showSignUp);

  const authCancelHandler = () => {
    showSignUpHandler();
    dispatch(actions.deleteResponse());
  };

  const searchContinueHandler = () => {
    user.preference ? history.push("/search") : showPreferenceHandler();
  };

  const preferenceSubmitHandler = () => history.push("/search");

  return (
    <div className={authenticated ? "homepage-member" : "homepage"}>
      {showSignUp ? (
        <SignUp show={showSignUp} close={authCancelHandler} auth={showSignUp} />
      ) : null}
      <h1 className="homepage-header">Find the best coffee shop in Malang</h1>
      <div className="homepage-btn-search">
        {authenticated ? (
          <BtnLarge clicked={searchContinueHandler}>Search</BtnLarge>
        ) : (
          <BtnLarge clicked={showSignUpHandler}>Sign Up</BtnLarge>
        )}
      </div>
      {showPreference ? (
        <PreferenceQuestionnaire
          closeClickHandler={showPreferenceHandler}
          onSubmit={preferenceSubmitHandler}
        />
      ) : null}
    </div>
  );
};

export default Homepage;
