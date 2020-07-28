import React, { useState, Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import TextForm from '../../../components/UI/TextForm/TextForm';
import Modal from '../../UI/Modal/Modal';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import { BtnMedium } from '../../UI/Button/Button';
import Spinner from '../../UI/Spinner/Spinner';
import classes from './SignUp.module.css';
import * as actions from '../../../store/actions/member';

const SignUp = ({ show, close }) => {
  const [signUp, setSignUp] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const response = useSelector((state) => state.member.response);
  const isAuthenticated = useSelector((state) => state.member.token !== null);

  const dispatch = useDispatch();
  const onSignUp = (email, password, name) => {
    dispatch(actions.signUp(email, password, name));
  };

  useEffect(() => {
    response && setIsLoading(false);
    isAuthenticated && close();
  }, [response, isAuthenticated, close]);

  const inputChangeHandler = (type) => (event) => {
    setSignUp({ ...signUp, [type]: event.target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);
    onSignUp(signUp.email, signUp.password, signUp.name);
    setSignUp({ ...signUp, password: "" });
  };

  return (
    <Modal show={show} close={close} classes={classes.SignUp}>
      {isLoading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className={classes.Header}>Sign Up</h1>
          {response && response.error ? (
            <div className={classes.ErrorMessage}>
              <ErrorMessage message={response.error.message} />
            </div>
          ) : null}
          <form
            className={classes.FormSignUp}
            id="form-register"
            onSubmit={submitHandler}
          >
            <TextForm
              id="name"
              label="Name"
              className={'textField-3'}
              value={signUp.name}
              inputHandler={inputChangeHandler('name')}
            />
            <TextForm
              id="email"
              label="Email"
              className={'textField-3'}
              value={signUp.email}
              inputHandler={inputChangeHandler('email')}
            />
            <TextForm
              id="password"
              label="Password"
              className={'textField-3'}
              inputHandler={inputChangeHandler('password')}
              type="password"
              autoComplete="current-password"
              placeholder="At least 6 characters"
            />
          </form>
          <BtnMedium btnType="Green" form="form-register" type="submit">
            Sign Up
          </BtnMedium>
        </Fragment>
      )}
    </Modal>
  );
};

export default SignUp;
