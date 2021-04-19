import { put, call } from "redux-saga/effects";
import axios from "axios";

import { config } from "../../firebase";
import * as actions from "../actions";

const API_KEY = config["apiKey"];

const getNewToken = async () => {
  const url = `https://securetoken.googleapis.com/v1/token?key=${API_KEY}`;
  const changeToken = {
    grant_type: "refresh_token",
    refresh_token: localStorage.getItem("refreshToken"),
  };

  try {
    const { data: changeResponse } = await axios.post(url, changeToken);

    const { id_token, refresh_token, expires_in } = changeResponse;

    return {
      idToken: id_token,
      refreshToken: refresh_token,
      expiresIn: expires_in,
    };
  } catch (error) {
    throw new Error(error);
  }
};

export function* signUpSaga(action) {
  const urlSignUp = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
  const urlUpdateName = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`;

  try {
    const { data: credential } = yield axios.post(urlSignUp, {
      email: action.email,
      password: action.password,
      returnSecureToken: true,
    });

    const { idToken, refreshToken, localId, email, expiresIn } = credential;

    const {
      data: { displayName: name },
    } = yield axios.post(urlUpdateName, {
      idToken: idToken,
      displayName: action.name,
    });

    const expirationDate = yield new Date(
      new Date().getTime() + expiresIn * 1000
    );
    yield localStorage.setItem("token", idToken);
    yield localStorage.setItem("refreshToken", refreshToken);
    yield localStorage.setItem("expirationDate", expirationDate);
    yield localStorage.setItem("localId", localId);

    yield put(actions.authSuccess(localId, idToken, email, name));
  } catch (error) {
    yield put(actions.setResponse(error.response.data));
  }
}

export function* loginSaga(action) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;

  try {
    const { data: credential } = yield axios.post(url, {
      email: action.email,
      password: action.password,
      returnSecureToken: true,
    });

    const { idToken, refreshToken, localId, expiresIn } = credential;

    const expirationDate = yield new Date(
      new Date().getTime() + expiresIn * 1000
    );

    yield localStorage.setItem("token", idToken);
    yield localStorage.setItem("refreshToken", refreshToken);
    yield localStorage.setItem("localId", localId);
    yield localStorage.setItem("expirationDate", expirationDate);

    if (action.rememberMe) {
      yield localStorage.setItem("rememberMe", true);
    }

    yield put(actions.getUserData(idToken, localId));
  } catch (error) {
    yield put(actions.setResponse(error.response.data));
  }
}

export function* logoutSaga() {
  try {
    yield call([localStorage, "clear"]);
  } catch (error) {
    console.log(error.response.data.error.message);
  }
}

export function* editProfileSaga(action) {
  const token = localStorage.getItem("token");
  const localId = localStorage.getItem("localId");
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`;

  try {
    const editProfile = {
      idToken: token,
      displayName: action.name,
      email: action.email,
      photoUrl: action.photoUrl,
      returnSecureToken: true,
    };

    const { data: response } = yield axios.post(url, editProfile);
    const { idToken, refreshToken, expiresIn } = response;

    if (idToken) {
      const expirationDate = yield new Date(
        new Date().getTime() + expiresIn * 1000
      );

      yield localStorage.setItem("token", idToken);
      yield localStorage.setItem("refreshToken", refreshToken);
      yield localStorage.setItem("expirationDate", expirationDate);
    }

    yield put(actions.setResponse(response));
    yield put(actions.getUserData(idToken || token, localId));
  } catch (error) {
    yield put(actions.setResponse(error.response.data));
  }
}

export function* editPasswordSaga(action) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`;

  try {
    const credential = yield getNewToken();

    const editPassword = {
      idToken: credential.idToken,
      password: action.password,
      returnSecureToken: true,
    };

    const { data: response } = yield axios.post(url, editPassword);
    const { idToken, refreshToken, expiresIn } = response;

    const expirationDate = yield new Date(
      new Date().getTime() + expiresIn * 1000
    );

    yield localStorage.setItem("token", idToken);
    yield localStorage.setItem("refreshToken", refreshToken);
    yield localStorage.setItem("expirationDate", expirationDate);

    yield put(actions.setResponse(response));
  } catch (error) {
    yield put(actions.setResponse(error.response.data));
  }
}

export function* setPreferenceSaga(action) {
  const localId = localStorage.getItem("localId");
  const url = `${process.env.REACT_APP_DB}/users/${localId}/preference.json`;

  try {
    yield axios.put(url, action.preference);

    yield put(actions.setPreferenceSuccess(action.preference));
  } catch (error) {
    console.log(error.response.data.error.message);
  }
}

export function* getUserDataSaga(action) {
  const urlAuth = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`;
  const urlDB = `${process.env.REACT_APP_DB}/users/${action.localId}.json`;

  try {
    const { data: auth } = yield axios.post(urlAuth, {
      idToken: action.token,
    });

    const { data: db } = yield axios.get(urlDB);

    const { email, displayName, photoUrl, emailVerified } = auth.users[0];

    const { preference, bookmark } = db || {};

    yield put(
      actions.authSuccess(
        action.localId,
        action.token,
        email,
        displayName,
        photoUrl,
        emailVerified,
        preference,
        bookmark
      )
    );
  } catch (error) {
    yield put(actions.setResponse(error.response?.data));
  }
}

export function* sendVerificationSaga() {
  const token = localStorage.getItem("token");
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${API_KEY}`;

  const sendVerification = {
    requestType: "VERIFY_EMAIL",
    idToken: token,
  };

  try {
    yield axios.post(url, sendVerification);

    yield put(actions.sendVerificationSuccess());
  } catch (error) {
    console.log(error.response.data.error.message);
  }
}

export function* authCheckStateSaga() {
  const token = localStorage.getItem("token");
  const localId = localStorage.getItem("localId");

  if (token) {
    const expirationDate = yield new Date(
      localStorage.getItem("expirationDate")
    );
    const rememberMe = localStorage.getItem("rememberMe");

    if (expirationDate > new Date()) {
      yield put(actions.getUserData(token, localId));
    } else if (rememberMe && expirationDate < new Date()) {
      const url = `https://securetoken.googleapis.com/v1/token?key=${API_KEY}`;
      const changeToken = {
        grant_type: "refresh_token",
        refresh_token: localStorage.getItem("refreshToken"),
      };

      try {
        const response = yield axios.post(url, changeToken);

        const { id_token, refresh_token, user_id, expires_in } = response.data;

        const expirationDate = yield new Date(
          new Date().getTime() + expires_in * 1000
        );

        yield localStorage.setItem("token", id_token);
        yield localStorage.setItem("refreshToken", refresh_token);
        yield localStorage.setItem("localId", user_id);
        yield localStorage.setItem("expirationDate", expirationDate);

        yield put(actions.getUserData(id_token, user_id));
      } catch (error) {
        yield put(actions.logout());
      }
    } else {
      yield put(actions.logout());
    }
  } else {
    yield put(actions.logout());
  }
}

export function* setBookmarkSaga(action) {
  const localId = localStorage.getItem("localId");
  const url = `${process.env.REACT_APP_DB}/users/${localId}/bookmark.json`;

  try {
    yield axios.put(url, action.coffeeShopIds);
    yield put(actions.setBookmarkSuccess(action.coffeeShopIds));
  } catch (error) {
    console.log(error.response.data.error.message);
  }
}
