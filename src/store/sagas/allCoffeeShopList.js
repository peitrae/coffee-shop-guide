import { put } from "redux-saga/effects";
import axios from "axios";

import * as actions from "../actions";

export function* getAllCoffeeShopListSaga() {
    const url = `https://coffee-shop-guide.firebaseio.com/coffeeshop.json`;

    try {
      const response = yield axios.get(url);
      const coffeeShopList = []
        for(let key in response.data) {
          coffeeShopList.push({
            ...response.data[key],
            id: key
          })
        }

      yield put(actions.getAllCoffeeShopListSuccess(coffeeShopList))
    } catch (error) {
      console.log(error.response.data.error.message);
    }
}