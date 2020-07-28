import React, { Fragment, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import TextForm from '../../../components/UI/TextForm/TextForm';
import Modal from '../../UI/Modal/Modal';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import Spinner from '../../UI/Spinner/Spinner';
import Checkbox from '../../UI/Checkbox/Checkbox';
import { BtnMedium } from '../../UI/Button/Button';
import classes from './Login.module.css';

const Login = (props) => {
  const { show, close, clicked, submit } = props;

  const [login, setLogin] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const response = useSelector((state) => state.member.response);
  const isAuthenticated = useSelector((state) => state.member.token !== null);

  useEffect(() => {
    response && setIsLoading(false);
    isAuthenticated && close();
  }, [response, isAuthenticated, close]);

  const inputChangeHandler = (type) => (event) => {
    setLogin({ ...login, [type]: event.target.value });
  };

  const rememberMeHandler = () => setRememberMe(!rememberMe);

  const submitHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);
    submit(login.email, login.password, rememberMe);
  };

  return (
    <Modal
      show={show}
      close={close}
      clicked={clicked}
      classes={classes.Login}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <Fragment>
        <h1 className={classes.Header}>Login</h1>
          {response && response.error ? (
            <div className={classes.ErrorMessage}>
              <ErrorMessage message={response.error.message} />
            </div>
          ) : null}
          <form className={classes.FormLogin} onSubmit={submitHandler} id="form-login">
            <TextForm
              id="email"
              label="Email"
              className={'textField-3'}
              value={login.email}
              inputHandler={inputChangeHandler('email')}
            />
            <TextForm
              id="password"
              label="Password"
              className={'textField-3'}
              inputHandler={inputChangeHandler('password')}
              type="password"
            />
            <Checkbox checked={rememberMe} changed={rememberMeHandler}>Remember Me</Checkbox>
          </form>
          
          <BtnMedium btnType="Green" form="form-login" type="submit">
            Login
          </BtnMedium>
        </Fragment>
      )}
    </Modal>
  );
};

export default Login;
// {
//   errorMessage ? <ErrorMessage message={errorMessage} /> : null;
// }
