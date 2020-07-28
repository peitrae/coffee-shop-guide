import { takeEvery, all } from "redux-saga/effects";

import * as actionTypes from "../actions/actionTypes";

import {
  signUpSaga,
  loginSaga,
  logoutSaga,
  editProfileSaga,
  editPasswordSaga,
  setPreferenceSaga,
  authCheckStateSaga,
  getUserDataSaga,
  sendVerificationSaga,
  getCoffeeShopUploadedBySaga,
  deleteCoffeeShopSaga,
  setRatingSaga,
} from "./member";

import {
  getAllCoffeeShopListSaga
} from "./allCoffeeShopList";

import {
  getCoffeeShopData,
  setCoffeeShopDataSaga
} from "./coffeeShop";

export function* watchMember() {
  yield all([
    takeEvery(actionTypes.MEMBER_SIGNUP, signUpSaga),
    takeEvery(actionTypes.MEMBER_LOGIN, loginSaga),
    takeEvery(actionTypes.MEMBER_LOGOUT, logoutSaga),
    takeEvery(actionTypes.MEMBER_CHECK_STATE, authCheckStateSaga),
    takeEvery(actionTypes.MEMBER_SET_PREFERENCE, setPreferenceSaga),
    takeEvery(actionTypes.MEMBER_GET_USER_DATA, getUserDataSaga),
    takeEvery(actionTypes.MEMBER_EDIT_PROFILE, editProfileSaga),
    takeEvery(actionTypes.MEMBER_EDIT_PASSWORD, editPasswordSaga),
    takeEvery(actionTypes.MEMBER_SEND_VERIFICATION, sendVerificationSaga),
    takeEvery(actionTypes.MEMBER_GET_COFFEE_SHOP_UPLOADED_BY, getCoffeeShopUploadedBySaga),
    takeEvery(actionTypes.MEMBER_DELETE_COFFEE_SHOP, deleteCoffeeShopSaga),
    takeEvery(actionTypes.MEMBER_SET_RATING, setRatingSaga)
  ]);
}

export function* watchAllCoffeeShopList() {
  yield all([
    takeEvery(actionTypes.ALL_COFFEE_SHOP_LIST_GET_DATA, getAllCoffeeShopListSaga)
  ]);
}

export function* watchCoffeeShop() {
  yield all([
    takeEvery(actionTypes.COFFEE_SHOP_GET_DATA, getCoffeeShopData),
    takeEvery(actionTypes.COFFEE_SHOP_SET_DATA, setCoffeeShopDataSaga)
  ]);
}


