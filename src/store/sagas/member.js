import { put, call } from "redux-saga/effects";
import axios from "axios";

import { config } from "../../config"
import * as actions from "../actions";

const API_KEY = config["apiKey"];
const TOKEN = localStorage.getItem("token");
const LOCAL_ID = localStorage.getItem("localId");

export function* signUpSaga(action) {
  const signUpData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true
  };

  const updateNameData = {
    idToken: responseSignUp.data.idToken,
    displayName: action.name
  }

  const urlSignUp =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + API_KEY;
  const urlUpdateProfile =
    "https://identitytoolkit.googleapis.com/v1/accounts:update?key=" + API_KEY;

  try {
    const responseSignUp = yield axios.post(urlSignUp, signUpData);
    const responseUpdateName = yield axios.post(urlUpdateProfile, updateNameData);

    const { idToken, refreshToken, localId, email } = responseSignUp.data;
    const displayName = responseUpdateName.data.displayName;

    const expirationDate = yield new Date(
      new Date().getTime() + responseSignUp.data.expiresIn * 1000
    );
    yield localStorage.setItem("token", idToken);
    yield localStorage.setItem("refreshToken", refreshToken);
    yield localStorage.setItem("expirationDate", expirationDate);
    yield localStorage.setItem("localId", localId);

    yield put(actions.authSuccess(localId, idToken, email, displayName));
  } catch (error) {
    yield put(actions.setError(error.response.data.error.message));
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

    const {
      idToken,
      refreshToken,
      localId,
      email,
      displayName
    } = responseLogin.data;
    const { photoUrl, emailVerified } = resUserData.data.users[0];

    const expirationDate = yield new Date(
      new Date().getTime() + responseLogin.data.expiresIn * 1000
    );

    yield localStorage.setItem("token", idToken);
    yield localStorage.setItem("refreshToken", refreshToken);
    yield localStorage.setItem("localId", localId);
    yield localStorage.setItem("expirationDate", expirationDate);

    yield put(actions.getUserData(idToken, localId));
    yield put(actions.getCoffeeShopUploadedBy(localId));
    yield put(
      actions.authSuccess(
        localId,
        idToken,
        email,
        displayName,
        photoUrl,
        emailVerified
      )
    );
  } catch (error) {
    yield put(actions.setError(error.response.data.error.message));
  }
}

export function* logoutSaga() {
  try {
    yield call([localStorage, "removeItem"], "token");
    yield call([localStorage, "removeItem"], "expirationDate");
    yield call([localStorage, "removeItem"], "localId");
    yield call([localStorage, "removeItem"], "refreshToken");
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
    email: action.email,
    photoUrl: action.photoUrl
  };

  console.log("editProfileData", editProfileData);

  try {
    const resEditProfile = yield axios.post(urlEditProfile, editProfileData);
    const { displayName, email, photoUrl } = resEditProfile.data;

    yield put(actions.editProfileSuccess(displayName, email, photoUrl));
    if (action.password) yield put(actions.login(email, action.password));
  } catch (error) {
    console.log(error);
  }
}

export function* editPasswordSaga(action) {
  const urlEditPassword =
    "https://identitytoolkit.googleapis.com/v1/accounts:update?key=" + API_KEY;

  try {
    yield axios.post(urlEditPassword, {
      idToken: TOKEN,
      password: action.password
    });

  } catch (error) {
    console.log(error.response.data.error.message);
  }
}

export function* setPreferenceSaga(action) {
  const url = `https://coffee-shop-guide.firebaseio.com/users/${action.localId}/preference.json?auth=${action.token}`;

  try {
    yield axios.put(url, action.preference);

    yield put(actions.setPreferenceSuccess(action.preference));
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
  const urlSendVerification = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${API_KEY}`;
  try {
    yield axios.post(urlSendVerification, {
      requestType: "VERIFY_EMAIL",
      idToken: TOKEN
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

      const {
        localId,
        email,
        displayName,
        photoUrl,
        emailVerified
      } = resUserData.data.users[0];
      yield put(
        actions.authSuccess(
          localId,
          TOKEN,
          email,
          displayName,
          photoUrl,
          emailVerified
        )
      );
      yield put(actions.getUserData(TOKEN, localId));
    }
  }
}

export function* getCoffeeShopUploadedBySaga(action) {
  const url = `https://coffee-shop-guide.firebaseio.com/coffeeshop.json?orderBy="uploadedBy"&equalTo="${action.localId}"`;

  try {
    const response = yield axios.get(url);

    const coffeeShopUploadedBy = [];
    for (let key in response.data) {
      coffeeShopUploadedBy.push({
        ...response.data[key],
        id: key
      });
    }

    yield put(actions.getCoffeeShopUploadedBySuccess(coffeeShopUploadedBy));
  } catch (error) {
    console.log(error.response.data.error.message);
  }
}

export function* deleteCoffeeShopSaga(action) {
  const url = `https://coffee-shop-guide.firebaseio.com/coffeeshop/${action.coffeeShopId}.json?auth=${TOKEN}`;
  try {
    yield axios.delete(url);
    yield put(actions.getCoffeeShopUploadedBy(LOCAL_ID));
  } catch (error) {
    console.log(error.response.data.error.message);
  }
}

export function* setRatingSaga(action) {
  const url = `https://coffee-shop-guide.firebaseio.com/coffeeshop/${action.coffeeShopId}/rating/${LOCAL_ID}.json?auth=${TOKEN}`;
  try {
    yield axios.put(url, action.rating);
    yield put(actions.getCoffeeShopData(action.coffeeShopId));
  } catch (error) {
    console.log(error.response.data.error.message);
  }
}
