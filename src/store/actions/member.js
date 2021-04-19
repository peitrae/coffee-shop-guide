import * as actionTypes from "./actionTypes";

export const signUp = (email, password, name) => {
  return {
    type: actionTypes.MEMBER_SIGNUP,
    email,
    password,
    name,
  };
};

export const login = (email, password, rememberMe) => {
  return {
    type: actionTypes.MEMBER_LOGIN,
    email,
    password,
    rememberMe,
  };
};

export const authSuccess = (
  localId,
  token,
  email,
  name,
  photoUrl,
  emailVerified,
  preference,
  bookmark
) => {
  return {
    type: actionTypes.MEMBER_AUTH_SUCCESS,
    localId,
    token,
    email,
    name,
    photoUrl,
    emailVerified,
    preference,
    bookmark,
  };
};

export const logout = () => {
  return {
    type: actionTypes.MEMBER_LOGOUT,
  };
};

export const authCheckState = (hasPreference) => {
  return {
    type: actionTypes.MEMBER_CHECK_STATE,
    hasPreference,
  };
};

export const editProfile = (name, email, photoUrl) => {
  return {
    type: actionTypes.MEMBER_EDIT_PROFILE,
    name,
    email,
    photoUrl,
  };
};

export const editProfileSuccess = (name, email, photoUrl) => {
  return {
    type: actionTypes.MEMBER_EDIT_PROFILE_SUCCESS,
    name,
    email,
    photoUrl,
  };
};

export const editPassword = (password) => {
  return {
    type: actionTypes.MEMBER_EDIT_PASSWORD,
    password,
  };
};

export const setPreference = (preference) => {
  return {
    type: actionTypes.MEMBER_SET_PREFERENCE,
    preference,
  };
};

export const setPreferenceSuccess = (preference) => {
  return {
    type: actionTypes.MEMBER_SET_PREFERENCE_SUCCESS,
    preference,
  };
};

export const getUserData = (token, localId) => {
  return {
    type: actionTypes.MEMBER_GET_USER_DATA,
    token,
    localId,
  };
};

export const sendVerification = () => {
  return {
    type: actionTypes.MEMBER_SEND_VERIFICATION,
  };
};

export const sendVerificationSuccess = () => {
  return {
    type: actionTypes.MEMBER_SEND_VERIFICATION_SUCCESS,
  };
};

export const setBookmark = (coffeeShopIds) => {
  return {
    type: actionTypes.MEMBER_SET_BOOKMARK,
    coffeeShopIds,
  };
};

export const setBookmarkSuccess = (coffeeShopIds) => {
  return {
    type: actionTypes.MEMBER_SET_BOOKMARK_SUCCESS,
    coffeeShopIds,
  };
};

export const setResponse = (response) => {
  return {
    type: actionTypes.MEMBER_SET_RESPONSE,
    response,
  };
};

export const deleteResponse = () => {
  return {
    type: actionTypes.MEMBER_DELETE_RESPONSE,
  };
};
