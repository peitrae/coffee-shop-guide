import * as actionTypes from "../actions/actionTypes";
import { updateState } from "../../utilities/updateState";

const initialState = {
  localId: null,
  token: null,
  email: null,
  name: null,
  photoURL: null,
  preference: false,
  emailSent: false,
  coffeeShopList: null,
  error: null
};

const authSuccess = (state, action) => {
  return updateState(state, {
    localId: action.localId,
    token: action.token,
    email: action.email,
    name: action.name,
    photoURL: action.photoURL,
    emailVerified: action.emailVerified,
    coffeeShopList: action.coffeeShopList,
  });
};

const authLogout = state => {
  return updateState(state, { ...initialState });
};

const editProfileSuccess = (state, action) => {
  return updateState(state, {
    email: action.email,
    name: action.name,
    photoURL: action.photoURL
  });
};

const getUserDataSuccess = (state, action) => {
  return updateState(state, {
    preference: action.preference,
    emailSent: action.emailSent
  });
};

const sendVerificationSuccess = state => {
  return updateState(state, { emailSent: true });
};

const getCoffeeShopUploadedBySuccess = (state, action) => {
  return updateState(state, { coffeeShopList: action.coffeeShopList });
};

const setError = (state, action) => {
  return updateState(state, { error: action.error });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.MEMBER_AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.MEMBER_LOGOUT:
      return authLogout(state);
    case actionTypes.MEMBER_GET_USER_DATA_SUCCESS:
      return getUserDataSuccess(state, action);
    case actionTypes.MEMBER_EDIT_PROFILE_SUCCESS:
      return editProfileSuccess(state, action);
    case actionTypes.MEMBER_SEND_VERIFICATION_SUCCESS:
      return sendVerificationSuccess(state);
    case actionTypes.MEMBER_GET_COFFEE_SHOP_UPLOADED_BY_SUCCESS:
      return getCoffeeShopUploadedBySuccess(state, action);
    case actionTypes.MEMBER_SET_ERROR:
      return setError(state, action);
    default:
      return state;
  }
};

export default reducer;
