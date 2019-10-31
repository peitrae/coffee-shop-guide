import * as actionTypes from './actionTypes';

export const authStart = () => {
    console.log('Action Start')
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token, userId) => {
    console.log('Action Success')
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    userId: userId
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const login = () => {
  return {
    type: actionTypes.AUTH_INITIATE_LOGIN
  }
}

export const logout = () => {
  // localStorage.removeItem('token');
  // localStorage.removeItem('expirationDate');
  // localStorage.removeItem('userId');
  return {
    type: actionTypes.AUTH_INITIATE_LOGOUT
  };
};

export const logoutSucceed = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  };
}

export const checkAuthTimeout = (expirationTime) => {
  return {
    type: actionTypes.AUTH_CHECK_TIMEOUT,
    expirationTime: expirationTime
  };
};

export const auth = (name, phoneNumber, email, password, isSignup) => {
  return {
    type: actionTypes.AUTH_USER,
    name,
    phoneNumber,
    email,
    password,
    isSignup
  }
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  };
};

export const authCheckState = () => {
  return {
    type: actionTypes.AUTH_CHECK_STATE
  };
};