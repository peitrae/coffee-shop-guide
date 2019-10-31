import { put, call } from "redux-saga/effects";
import axios from "axios";

import * as actions from "../actions";

const API_KEY = "AIzaSyDQW-erUjRKlvBa-E3IaeCJZnFFCvQgcW4";
const TOKEN = localStorage.getItem("token");
const LOCAL_ID = localStorage.getItem("localId");

export function* signUpSaga(action) {
  const signUpData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true
  };

  const urlSignUp =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + API_KEY;
  const urlUpdateProfile =
    "https://identitytoolkit.googleapis.com/v1/accounts:update?key=" + API_KEY;

  try {
    const responseSignUp = yield axios.post(urlSignUp, signUpData);
    const responseUpdateName = yield axios.post(urlUpdateProfile, {
      idToken: responseSignUp.data.idToken,
      displayName: action.name
    });

    const expirationDate = yield new Date(
      new Date().getTime() + responseSignUp.data.expiresIn * 1000
    );
    yield localStorage.setItem("token", responseSignUp.data.idToken);
    yield localStorage.setItem("expirationDate", expirationDate);
    yield localStorage.setItem("localId", responseSignUp.data.localId);
    yield put(
      actions.authSuccess(
        responseSignUp.data.localId,
        responseSignUp.data.idToken,
        responseSignUp.data.email,
        responseUpdateName.data.displayName
      )
    );
  } catch (error) {
    console.log(error.response.data.error.message);
  }
}

export function* loginSaga(action) {
  const loginData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true
  };

  const urlLogin =
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
    API_KEY;

  const urlGetUserData =
    "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=";

  try {
    const responseLogin = yield axios.post(urlLogin, loginData);
    const resUserData = yield axios.post(urlGetUserData + API_KEY, {
      idToken: responseLogin.data.idToken
    });

    const token = responseLogin.data.idToken;
    const localId = responseLogin.data.localId;
    const email = responseLogin.data.email;
    const name = responseLogin.data.displayName;
    const emailVerified = resUserData.emailVerified;

    const expirationDate = yield new Date(
      new Date().getTime() + responseLogin.data.expiresIn * 1000
    );

    yield localStorage.setItem("token", token);
    yield localStorage.setItem("localId", localId);
    yield localStorage.setItem("expirationDate", expirationDate);

    yield put(actions.getUserData(token, localId));
    yield put(actions.authSuccess(localId, token, email, name, emailVerified));
  } catch (error) {
    console.log(error.response.data.error.message);
  }
}

export function* logoutSaga() {
  try {
    yield call([localStorage, "removeItem"], "token");
    yield call([localStorage, "removeItem"], "expirationDate");
    yield call([localStorage, "removeItem"], "localId");
  } catch (error) {
    console.log(error.response.data.error.message);
  }
}

export function* editProfileSaga(action) {
  const urlEditProfile =
    "https://identitytoolkit.googleapis.com/v1/accounts:update?key=" + API_KEY;

  const TOKEN = localStorage.getItem("token");

  const editProfileData = {
    idToken: TOKEN,
    displayName: action.name,
    email: action.email
  };

  try {
    const resEditProfile = yield axios.post(urlEditProfile, editProfileData);

    const { displayName, email } = resEditProfile.data;

    yield put(actions.editProfileSuccess(displayName, email));
  } catch (error) {
    console.log(error);
  }
}

export function* editPasswordSaga(action) {
  const urlEditPassword =
    "https://identitytoolkit.googleapis.com/v1/accounts:update?key=" + API_KEY;

  try {
    const resEditPassword = yield axios.post(urlEditPassword, {
      idToken: TOKEN,
      password: action.password
    });

    console.log("resEditPassword", resEditPassword);
  } catch (error) {
    console.log(error.response.data.error.message);
  }
}

export function* setPreferenceSaga(action) {
  const url = `https://coffee-shop-guide.firebaseio.com/users/${LOCAL_ID}/preference.json?auth=${TOKEN}`;

  try {
    const response = yield axios.put(url, action.preference);

    console.log("setPreferenceSaga", response);

    yield put(actions.setPreferenceSuccess([action.preference]));
  } catch (error) {
    console.log(error.response.data.error.message);
  }
}

export function* getUserDataSaga(action) {
  const url = `https://coffee-shop-guide.firebaseio.com/users/${action.localId}.json?auth=${action.token}`;
  let preference = false;
  let emailSent = false;

  try {
    const response = yield axios.get(url);
    const resultData = response.data;

    if (resultData) {
      resultData.preference && (preference = resultData.preference);
      resultData.emailSent && (emailSent = resultData.emailSent.data);
    }

    yield put(actions.getUserDataSuccess(preference, emailSent));
  } catch (error) {
    console.log(error);
  }
}

export function* sendVerificationSaga() {
  const urlSendVerification =
    "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=" +
    API_KEY;
  const urlSetEmailSent = `https://coffee-shop-guide.firebaseio.com/users/${LOCAL_ID}/emailSent.json?auth=${TOKEN}`;
  try {
    // yield axios.post(urlSendVerification, {
    //   requestType: "VERIFY_EMAIL",
    //   idToken: TOKEN
    // }) DONT DELETE
    yield axios.put(urlSetEmailSent, {
      data: true
    });

    yield put(actions.sendVerificationSuccess());
  } catch (error) {
    console.log(error.response.data.error.message);
  }
}

export function* authCheckStateSaga(action) {
  const hasPreference = action.hasPreference;

  const url = "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=";

  if (!TOKEN) {
    yield put(actions.logout());
  } else if (hasPreference) {
    yield put(actions.getUserData(TOKEN, LOCAL_ID));
  } else {
    const expirationDate = yield new Date(
      localStorage.getItem("expirationDate")
    );

    if (expirationDate <= new Date()) {
      yield put(actions.logout());
    } else {
      const resUserData = yield axios.post(url + API_KEY, {
        idToken: TOKEN
      });

      const localId = resUserData.data.users[0].localId;
      const email = resUserData.data.users[0].email;
      const displayName = resUserData.data.users[0].displayName;
      const emailVerified = resUserData.data.users[0].emailVerified;

      yield put(
        actions.authSuccess(localId, TOKEN, email, displayName, emailVerified)
      );
      yield put(actions.getUserData(TOKEN, localId));
    }
  }
}

export function* getCoffeeShopUploadedBySaga() {
  const url = `https://coffee-shop-guide.firebaseio.com/coffeeshop.json?orderBy="uploadedBy"&equalTo="${LOCAL_ID}"`;

  try {
    const response = yield axios.get(url);

    const result = [];
    for (let key in response.data) {
      result.push({
        ...response.data[key],
        id: key
      });
    }

    yield put(actions.getCoffeeShopUploadedBySuccess(result));
  } catch (error) {
    console.log(error.response.data.error.message);
  }
}

export function* deleteCoffeeShopSaga(action) {
  const url = `https://coffee-shop-guide.firebaseio.com/coffeeshop/${action.coffeeShopId}.json?auth=${TOKEN}`;
  try {
    yield axios.delete(url);
    yield put(actions.getAllCoffeeShopList());
  } catch (error) {
    console.log(error.response.data.error.message);
  }
}

export function* setRatingSaga(action) {
  const url = `https://coffee-shop-guide.firebaseio.com/coffeeshop/${action.coffeeShopId}/rating/${LOCAL_ID}.json?auth=${TOKEN}`
  try {
    const response = axios.put(url, action.rating)
    console.log(response)
  } catch (error) {
    console.log(error.response.data.error.message);
  }
}
