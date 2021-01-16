import { put } from "redux-saga/effects";
import axios from "axios";

import * as actions from "../actions";

export function* getAllCoffeeShopListSaga() {
  const url = `https://coffee-shop-guide.firebaseio.com/coffeeshop.json`;

  try {
    const { data: list } = yield axios.get(url);

    const coffeeShops = [];
    for (let key in list) {
      coffeeShops.push({
        ...list[key],
        id: key,
      });
    }

    yield put(actions.getAllCoffeeShopListSuccess(coffeeShops));
  } catch (error) {
    console.log(error.response.data.error.message);
  }
}
