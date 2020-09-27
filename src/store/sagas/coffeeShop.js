import { put } from "redux-saga/effects";
import axios from "axios";
import * as actions from "../actions";

const TOKEN = localStorage.getItem("token");

export function* getCoffeeShopData(action) {
  const url = `https://coffee-shop-guide.firebaseio.com/coffeeshop/${action.coffeeShopId}.json`;

  try {
    const response = yield axios.get(url);
    yield put(
      actions.getCoffeeShopDataSuccess({
        coffeeShop_id: action.coffeeShopId,
        ...response.data,
      })
    );
  } catch (error) {
    console.log(error.response.data.error.message);
  }
}

export function* setCoffeeShopDataSaga(action) {
  try {
    let response = null;
    let coffeeShopId = null;
    if (action.coffeeShopId) {
      const url = `https://coffee-shop-guide.firebaseio.com/coffeeshop/${action.coffeeShopId}.json?auth=${TOKEN}`;
      response = yield axios.put(url, action.coffeeShopData);
      coffeeShopId = action.coffeeShopId;
    } else {
      const url = `https://coffee-shop-guide.firebaseio.com/coffeeshop.json?auth=${TOKEN}`;
      response = yield axios.post(url, action.coffeeShopData);
      coffeeShopId = response.data.name;
    }

    yield action.history.push(`/coffee-shop/${coffeeShopId}`);
  } catch (error) {
    console.log(error.response.data.error.message);
  }
}

export function* getBookmarkSaga(action) {

  const url = `https://coffee-shop-guide.firebaseio.com/coffeeshop.json`;

  try {
    const response = yield axios.get(url);

    const coffeeShops = [];
    for (let key in response.data) {
      if (action.coffeeShopIds.includes(key)) {
        coffeeShops.push({
          ...response.data[key],
          id: key,
        });
      }
    }

    yield put(actions.getBookmarkSuccess(coffeeShops));
  } catch (error) {
    console.log(error.response.data.error.message);
  }
}
