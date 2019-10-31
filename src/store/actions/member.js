import * as actionTypes from "./actionTypes";

export const signUp = (email, password, name) => {
  return {
    type: actionTypes.MEMBER_SIGNUP,
    email: email,
    password: password,
    name: name
  };
};

export const login = (email, password) => {
  return {
    type: actionTypes.MEMBER_LOGIN,
    email,
    password
  };
};

export const authSuccess = (localId, idToken, email, name, emailVerified) => {
  return {
    type: actionTypes.MEMBER_AUTH_SUCCESS,
    localId,
    idToken,
    email,
    name,
    emailVerified
  };
};

export const logout = () => {
  return {
    type: actionTypes.MEMBER_LOGOUT
  };
};

export const authCheckState = hasPreference => {
  return {
    type: actionTypes.MEMBER_CHECK_STATE,
    hasPreference,
  };
};

export const editProfile = (name, email) => {
  return {
    type: actionTypes.MEMBER_EDIT_PROFILE,
    name,
    email
  };
};

export const editProfileSuccess = (name, email) => {
  return {
    type: actionTypes.MEMBER_EDIT_PROFILE_SUCCESS,
    name,
    email
  };
};

export const editPassword = password => {
  return {
    type: actionTypes.MEMBER_EDIT_PASSWORD,
    password
  };
};

export const setPreference = (preference) => {
  return {
    type: actionTypes.MEMBER_SET_PREFERENCE,
    preference
  };
};

export const setPreferenceSuccess = preference => {
  return {
    type: actionTypes.MEMBER_SET_PREFERENCE_SUCCESS,
    preference
  };
};

export const getUserData = (token, localId) => {
  return {
    type: actionTypes.MEMBER_GET_USER_DATA,
    token,
    localId
  };
};

export const getUserDataSuccess = (preference, emailSent) => {
  return {
    type: actionTypes.MEMBER_GET_USER_DATA_SUCCESS,
    preference,
    emailSent
  };
};

export const sendVerification = () => {
  return {
    type: actionTypes.MEMBER_SEND_VERIFICATION
  };
};

export const sendVerificationSuccess = () => {
  return {
    type: actionTypes.MEMBER_SEND_VERIFICATION_SUCCESS
  };
};

export const getCoffeeShopUploadedBy = userId => {
  return {
    type: actionTypes.MEMBER_GET_COFFEE_SHOP_UPLOADED_BY,
    userId
  }
}

export const getCoffeeShopUploadedBySuccess = coffeeShopList => {
  return {
    type: actionTypes.MEMBER_GET_COFFEE_SHOP_UPLOADED_BY_SUCCESS,
    coffeeShopList
  }
}

export const deleteCoffeeShop = coffeeShopId => {
  return {
    type: actionTypes.MEMBER_DELETE_COFFEE_SHOP,
    coffeeShopId
  }
}

export const setRating = (rating, coffeeShopId) => {
  return {
    type: actionTypes.MEMBER_SET_RATING,
    rating,
    coffeeShopId
  }
}
