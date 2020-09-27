import * as actionTypes from "../actions/actionTypes";
import { updateState } from "../../utilities/updateState";

const initialState = {
  localId: null,
  token: null,
  email: null,
  name: null,
  photoUrl: null,
  preference: null,
  emailSent: null,
  coffeeShopList: null,
  emailVerified: null,
  bookmark: [],
  response: null,
};

const authSuccess = (state, action) => {
  return updateState(state, {
    localId: action.localId,
    token: action.token,
    email: action.email,
    name: action.name,
    photoUrl: action.photoUrl,
    emailVerified: action.emailVerified,
    preference: action.preference,
    emailSent: action.emailSent,
    bookmark: action.bookmark || [],
  });
};

const authLogout = (state) => {
  return updateState(state, { ...initialState });
};

const setPreferenceSuccess = (state, action) => {
  return updateState(state, {
    preference: action.preference,
  });
};

const editProfileSuccess = (state, action) => {
  return updateState(state, {
    email: action.email,
    name: action.name,
    photoUrl: action.photoUrl,
  });
};

const sendVerificationSuccess = (state) => {
  return updateState(state, { emailSent: true });
};

const getCoffeeShopUploadedBySuccess = (state, action) => {
  return updateState(state, { coffeeShopList: action.coffeeShopList });
};

const setBookmarkSuccess = (state, action) => {
  return updateState(state, { bookmark: action.coffeeShopIds });
};

// const getBookmarkIdsSuccess = (state, action) => {
//   return updateState(state, { bookmark: action.bookmark });
// };

const setResponse = (state, action) => {
  return updateState(state, { response: action.response });
};

const deleteResponse = (state) => {
  return updateState(state, { response: null });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.MEMBER_AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.MEMBER_LOGOUT:
      return authLogout(state);
    case actionTypes.MEMBER_SET_PREFERENCE_SUCCESS:
      return setPreferenceSuccess(state, action);
    case actionTypes.MEMBER_EDIT_PROFILE_SUCCESS:
      return editProfileSuccess(state, action);
    case actionTypes.MEMBER_SEND_VERIFICATION_SUCCESS:
      return sendVerificationSuccess(state);
    case actionTypes.MEMBER_GET_COFFEE_SHOP_UPLOADED_BY_SUCCESS:
      return getCoffeeShopUploadedBySuccess(state, action);
    case actionTypes.MEMBER_SET_BOOKMARK_SUCCESS:
      return setBookmarkSuccess(state, action);
    // case actionTypes.MEMBER_GET_BOOKMARK_IDS_SUCCESS:
    //   return getBookmarkIdsSuccess(state, action);
    case actionTypes.MEMBER_SET_RESPONSE:
      return setResponse(state, action);
    case actionTypes.MEMBER_DELETE_RESPONSE:
      return deleteResponse(state);
    default:
      return state;
  }
};

export default reducer;
