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
  setBookmarkSaga,
} from "./member";

import {
  getCoffeeShop,
  addCoffeeShopReview,
  getCoffeeShopReviews,

  setCoffeeShopDataSaga,
  getBookmarkSaga,
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
    takeEvery(actionTypes.MEMBER_SET_BOOKMARK, setBookmarkSaga),
  ]);
}

export function* watchCoffeeShop() {
  yield all([
    takeEvery(actionTypes.COFFEE_SHOP_GET, getCoffeeShop),
    takeEvery(actionTypes.COFFEE_SHOP_ADD_REVIEW, addCoffeeShopReview),
    takeEvery(actionTypes.COFFEE_SHOP_GET_REVIEWS, getCoffeeShopReviews),

    takeEvery(actionTypes.COFFEE_SHOP_ADD, setCoffeeShopDataSaga),
    takeEvery(actionTypes.COFFEE_SHOP_GET_BOOKMARK, getBookmarkSaga),
  ]);
}
