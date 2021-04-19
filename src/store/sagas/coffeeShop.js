import { put } from "redux-saga/effects";
import axios from "axios";
import * as actions from "../actions";

export function* getCoffeeShop(action) {
  const url = `${process.env.REACT_APP_DB}/coffeeshop/${action.coffeeShopId}.json`;

  yield put(actions.setCoffeeShopLoading(true));

  try {
    const { data: coffeeShop } = yield axios.get(url);

    yield put(
      actions.setCoffeeShop({
        ...coffeeShop,
        id: action.coffeeShopId,
      })
    );
    yield put(actions.setCoffeeShopLoading(false));
  } catch (error) {
    console.log(error);
  }
}

export function* addCoffeeShopReview(action) {
  const localId = localStorage.getItem("localId");
  const url = `${process.env.REACT_APP_DB}/coffeeshop/${action.coffeeShopId}/reviews/${localId}.json`;
  try {
    yield axios.put(url, action.review);
    yield put(actions.getCoffeeShopReviews(action.coffeeShopId));
  } catch (error) {
    console.log(error.response.data.error.message);
  }
}

export function* getCoffeeShopReviews(action) {
  const url = `${process.env.REACT_APP_DB}/coffeeshop/${action.coffeeShopId}/reviews.json`;

  try {
    const { data: review } = yield axios.get(url);

    yield put(actions.setCoffeeShopReviews(review));
  } catch (error) {
    console.log(error.response.data.error.message);
  }
}

// =========================

export function* setCoffeeShopDataSaga(action) {
  try {
    let response = null;
    let coffeeShopId = null;
    if (action.coffeeShopId) {
      const url = `${process.env.REACT_APP_DB}/coffeeshop/${action.coffeeShopId}.json`;
      response = yield axios.put(url, action.coffeeShopData);
      coffeeShopId = action.coffeeShopId;
    } else {
      const url = `${process.env.REACT_APP_DB}/coffeeshop.json`;
      response = yield axios.post(url, action.coffeeShopData);
      coffeeShopId = response.data.name;
    }

    yield action.history.push(`/coffee-shop/${coffeeShopId}`);
  } catch (error) {
    console.log(error.response.data.error.message);
  }
}

export function* getBookmarkSaga(action) {
  const url = `${process.env.REACT_APP_DB}/coffeeshop.json`;

  try {
    const { data: coffeeShops } = yield axios.get(url);

    const bookmarkedCoffeeShops = [];
    for (let key in coffeeShops) {
      if (action.coffeeShopIds.includes(key)) {
        bookmarkedCoffeeShops.push({
          ...coffeeShops[key],
          id: key,
        });
      }
    }

    yield put(actions.getBookmarkSuccess(bookmarkedCoffeeShops));
  } catch (error) {
    console.log(error.response.data.error.message);
  }
}
