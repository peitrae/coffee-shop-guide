import { put } from "redux-saga/effects";
import axios from "axios";
import moment from "moment";
import * as actions from "../actions";

const TOKEN = localStorage.getItem("token");

export function* getCoffeeShopData(action) {
  const coffeeShopUrl = `https://coffee-shop-guide.firebaseio.com/coffeeshop/${action.coffeeShopId}.json`;
  const usersUrl =
    "https://us-central1-coffee-shop-guide.cloudfunctions.net/getBulkUsersById";

  try {
    const coffeeshop = yield axios.get(coffeeShopUrl);

    const userIds = [];
    for (let key in coffeeshop.data.feedback) {
      userIds.push({ uid: key });
    }

    const users = yield axios.post(usersUrl, userIds);

    const usersObj = {};
    for (let user of users.data.users) {
      usersObj[user.uid] = {
        name: user.displayName,
        photoURL: user.photoURL,
      };
    }

    const feedback = {};
    for (let key in coffeeshop.data.feedback) {
      feedback[key] = {
        name: usersObj[key].name,
        photoURL: usersObj[key]?.photoURL,
        rating: coffeeshop.data.feedback[key].rating,
        review: coffeeshop.data.feedback[key].review,
        date: moment(coffeeshop.data.feedback[key].date).format("DD MMMM YYYY"),
      };
    }

    yield put(
      actions.getCoffeeShopDataSuccess({
        ...coffeeshop.data,
        coffeeShop_id: action.coffeeShopId,
        feedback,
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
    const response = yield axios.get(url);

    yield put(
      actions.getCoffeeShopPromoSuccess({ coffeeShopId, list: response.data })
    );
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
