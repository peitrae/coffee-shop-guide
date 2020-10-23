import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import SignUp from '../../components/Auth/SignUp/SignUp';
import { BtnLarge } from '../../components/UI/Button/Button';
import Preference from './Preference/Preference';
import * as actions from "../../store/actions/member";

import "./Homepage.scss";

const Homepage = (props) => {
  const dispatch = useDispatch()

  const [showPreference, setShowPreference] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const userData = useSelector((state) => state.member);

  const authenticated = userData.token !== null;

  const preferenceCancelHandler = () => setShowPreference(false);

  const authCancelHandler = () => {
    setShowSignUp(false);
    dispatch(actions.deleteResponse());
  };

  const searchContinueHandler = () => {
    userData.preference
      ? props.history.push('/search')
      : setShowPreference(true);
  };

  let button = <BtnLarge clicked={() => setShowSignUp(true)}>Sign Up</BtnLarge>;
  if (authenticated) {
    button = <BtnLarge clicked={searchContinueHandler}>Search</BtnLarge>;
  }

  return (
    <div className={authenticated ? "homepage-member" : "homepage"}>
      {showSignUp ? (
        <SignUp show={showSignUp} close={authCancelHandler} auth={showSignUp} />
      ) : null}
      <h1 className="homepage-header">Find the best coffee shop in Malang</h1>
      <div className="homepage-btn-search">{button}</div>
      {showPreference ? (
        <Preference
          show={showPreference}
          close={preferenceCancelHandler}
          localId={userData.localId}
        />
      ) : null}
    </div>
  );
};

export default Homepage;
