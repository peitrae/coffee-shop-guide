import { put, call } from "redux-saga/effects";
import axios from "axios";

import { config } from "../../firebase";
import * as actions from "../actions";

const API_KEY = config["apiKey"];

export function* signUpSaga(action) {
  const signUpData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true,
  };

  const urlSignUp =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + API_KEY;
  const urlUpdateProfile =
    "https://identitytoolkit.googleapis.com/v1/accounts:update?key=" + API_KEY;

  try {
    const responseSignUp = yield axios.post(urlSignUp, signUpData);

    const { idToken, refreshToken, localId, email } = responseSignUp.data;

    const responseUpdate = yield axios.post(urlUpdateProfile, {
      idToken: idToken,
      displayName: action.name,
    });

    const name = responseUpdate.data.displayName;

    const expirationDate = yield new Date(
      new Date().getTime() + responseSignUp.data.expiresIn * 1000
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
  const loginData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true,
  };

  const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;

  try {
    const response = yield axios.post(url, loginData);

    const { idToken, refreshToken, localId, expiresIn } = response.data;

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
  let token = localStorage.getItem("token");
  const localId = localStorage.getItem("localId");

  const urlEditProfile =
    "https://identitytoolkit.googleapis.com/v1/accounts:update?key=" + API_KEY;

  const editProfileData = {
    idToken: token,
    displayName: action.name,
    email: action.email,
    photoUrl: action.photoUrl,
    returnSecureToken: true,
  };

  try {
    const resEditProfile = yield axios.post(urlEditProfile, editProfileData);
    const { idToken, refreshToken } = yield resEditProfile.data;

    if (idToken) {
      token = idToken;
      yield localStorage.setItem("token", idToken);
      yield localStorage.setItem("refreshToken", refreshToken);
    }

    yield put(actions.setResponse(resEditProfile.data));
    yield put(actions.getUserData(token, localId));
  } catch (error) {
    console.log("ERROR EDIT");
    yield put(actions.setResponse(error.response.data));
  }
}

export function* editPasswordSaga(action) {
  const token = localStorage.getItem("token");
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`;

  const editPasswordData = {
    idToken: token,
    password: action.password,
    returnSecureToken: true,
  };

  try {
    const response = yield axios.post(url, editPasswordData);
    const { idToken, refreshToken } = response.data;

    yield localStorage.setItem("token", idToken);
    yield localStorage.setItem("refreshToken", refreshToken);
  } catch (error) {
    console.log(error.response.data.error.message);
  }
}

export function* setPreferenceSaga(action) {
  const localId = localStorage.getItem("localId");
  const url = `https://coffee-shop-guide.firebaseio.com/users/${localId}/preference.json`;

  try {
    yield axios.put(url, action.preference);

    yield put(actions.setPreferenceSuccess(action.preference));
  } catch (error) {
    console.log(error.response.data.error.message);
  }
}

export function* getUserDataSaga(action) {
  const urlAuth = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`;
  const urlDB = `https://coffee-shop-guide.firebaseio.com/users/${action.localId}.json`;

  try {
    const resAuth = yield axios.post(urlAuth, {
      idToken: action.token,
    });
    const resDB = yield axios.get(urlDB);

    const {
      email,
      displayName,
      photoUrl,
      emailVerified,
    } = resAuth.data.users[0];

    const { preference, bookmark} = resDB.data || {};

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

  const sendVerificationData = {
    requestType: "VERIFY_EMAIL",
    idToken: token,
  };

  try {
    yield axios.post(url, sendVerificationData);

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
      const changeTokenData = {
        grant_type: "refresh_token",
        refresh_token: localStorage.getItem("refreshToken"),
      };

      try {
        const response = yield axios.post(url, changeTokenData);

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

export function* getCoffeeShopUploadedBySaga(action) {
  const url = `https://coffee-shop-guide.firebaseio.com/coffeeshop.json?orderBy="uploadedBy"&equalTo="${action.localId}"`;

  try {
    const response = yield axios.get(url);

    const coffeeShopUploadedBy = [];
    for (let key in response.data) {
      coffeeShopUploadedBy.push({
        ...response.data[key],
        id: key,
      });
    }

    yield put(actions.getCoffeeShopUploadedBySuccess(coffeeShopUploadedBy));
  } catch (error) {
    console.log(error.response.data.error.message);
  }
}

export function* deleteCoffeeShopSaga(action) {
  const localId = localStorage.getItem("localId");
  const url = `https://coffee-shop-guide.firebaseio.com/coffeeshop/${action.coffeeShopId}.json`;

  try {
    yield axios.delete(url);
    yield put(actions.getCoffeeShopUploadedBy(localId));
  } catch (error) {
    console.log(error.response.data.error.message);
  }
}

export function* setFeedbackCoffeeShopSaga(action) {
  const localId = localStorage.getItem("localId");
  const url = `https://coffee-shop-guide.firebaseio.com/coffeeshop/${action.coffeeShopId}/feedback/${localId}.json`;
  try {
    yield axios.put(url, action.feedback);
    yield put(actions.getCoffeeShopData(action.coffeeShopId));
  } catch (error) {
    console.log(error.response.data.error.message);
  }
}

export function* setBookmarkSaga(action) {
  const localId = localStorage.getItem("localId");
  const url = `https://coffee-shop-guide.firebaseio.com/users/${localId}/bookmark.json`;

  try {
    yield axios.put(url, action.coffeeShopIds);
    yield put(actions.setBookmarkSuccess(action.coffeeShopIds));
    yield put(actions.getBookmark(action.coffeeShopIds));
  } catch (error) {
    console.log(error.response.data.error.message);
  }
}

// export function* getBookmarkIdsSaga() {
//   const localId = localStorage.getItem("localId");
//   const url = `https://coffee-shop-guide.firebaseio.com/users/${localId}/bookmark.json`;

//   try {
//     const response = yield axios.get(url);

//     yield put(actions.getBookmarkIdsSuccess(response));
//   } catch (error) {
//     console.log(error.response.data.error.message);
//   }
// }