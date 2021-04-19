import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "../UI/Modal";
import ErrorMessage from "../ErrorMessage";
import Spinner from "../UI/Spinner";
import Checkbox from "../UI/Checkbox";
import { Button } from "../UI/Button";
import InputField from "../UI/InputField/InputField";
import * as actions from "../../store/actions/member";

const Login = ({ handleClose }) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const { token: authenticated, response } = useSelector(
    ({ member }) => member
  );

  useEffect(() => {
    if (response) {
      setLoading(false);
      setLogin({
        password: "",
      });
    }
    authenticated && handleClose();
  }, [response, authenticated, handleClose]);

  const handleInputChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    dispatch(actions.login(login.email, login.password, rememberMe));
  };

  if (loading) {
    return (
      <Modal className="auth">
        <Spinner />
      </Modal>
    );
  }

  return (
    <Modal handleClose={handleClose} className="auth">
      <h1 className="auth__title">Login</h1>
      {response?.error ? (
        <ErrorMessage className="auth__error">
          {response.error.message}
        </ErrorMessage>
      ) : null}
      <form className="auth__form" onSubmit={handleSubmit}>
        <InputField
          name="email"
          placeholder="Email"
          value={login.email}
          onChange={handleInputChange}
          className="margin-v-16"
        />
        <InputField
          name="password"
          placeholder="Password"
          onChange={handleInputChange}
          type="password"
          className="margin-b-16"
        />
        <Checkbox
          checked={rememberMe}
          onChange={() => setRememberMe(!rememberMe)}
        >
          Remember Me
        </Checkbox>
      </form>
      <Button onClick={handleSubmit}>Login</Button>
    </Modal>
  );
};

export default Login;
