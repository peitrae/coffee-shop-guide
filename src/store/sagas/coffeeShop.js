import { put } from "redux-saga/effects";
import axios from "axios";
import * as actions from "../actions";

const TOKEN = localStorage.getItem("token");

export function* getCoffeeShop(action) {
  const urlCoffeeShop = `https://coffee-shop-guide.firebaseio.com/coffeeshop/${action.coffeeShopId}.json`;
  // const urlUser =
  //   "https://us-central1-coffee-shop-guide.cloudfunctions.net/getBulkUsersById";

  try {
    const { data: coffeeShop } = yield axios.get(urlCoffeeShop);

    yield put(
      actions.getCoffeeShopDataSuccess({
        ...coffeeShop,
        coffeeShop_id: action.coffeeShopId,
      })
    );
  } catch (error) {
    console.log(error);
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

export function* setCoffeeShopPromoSaga({ promo, coffeeShopId }) {
  const url = `https://coffee-shop-guide.firebaseio.com/coffeeshop/${coffeeShopId}/promo.json`;

  try {
    yield axios.post(url, { value: promo });

    yield put(actions.getCoffeeShopPromo(coffeeShopId));
  } catch (error) {
    console.log(error.response.data.error.message);
  }
}

export function* getCoffeeShopPromoSaga({ coffeeShopId }) {
  const url = `https://coffee-shop-guide.firebaseio.com/coffeeshop/${coffeeShopId}/promo.json`;

  try {
    const { data: promos } = yield axios.get(url);

    yield put(
      actions.getCoffeeShopPromoSuccess({ coffeeShopId, list: promos })
    );
  } catch (error) {
    console.log(error.response.data.error.message);
  }
}

export function* editCoffeeShopPromoSaga({ promo, promoId, coffeeShopId }) {
  const url = `https://coffee-shop-guide.firebaseio.com/coffeeshop/${coffeeShopId}/promo/${promoId}.json`;

  try {
    yield axios.put(url, { value: promo });

    yield put(actions.getCoffeeShopPromo(coffeeShopId));
  } catch (error) {
    console.log(error.response.data.error.message);
  }
}

export function* deleteCoffeeShopPromoSaga({ promoId, coffeeShopId }) {
  const url = `https://coffee-shop-guide.firebaseio.com/coffeeshop/${coffeeShopId}/promo/${promoId}.json`;
  try {
    yield axios.delete(url);

    yield put(actions.getCoffeeShopPromo(coffeeShopId));
  } catch (error) {
    console.log(error.response.data.error.message);
  }
}
