import * as actionTypes from "../actions/actionTypes";
import { updateState } from "../../utils/updateState";

const initialState = {
  data: null,
  loading: true,
  redirect: null,
  bookmark: [],
  promo: null,
};

const setLoading = (state, action) => {
  return updateState(state, {
    loading: action.loading,
  });
};

const setCoffeeShop = (state, action) => {
  return updateState(state, {
    data: action.coffeeShop,
  });
};

const setCoffeeShopReviews = (state, action) => {
  return updateState(state, {
    data: { ...state.data, reviews: action.reviews },
  });
};

const setCoffeeShopDataSuccess = (state, action) => {
  return updateState(state, {
    data: action.data,
    redirect: action.redirect,
  });
};

const getBookmarkSuccess = (state, action) => {
  return updateState(state, {
    bookmark: action.coffeeShops,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.COFFEE_SHOP_SET:
      return setCoffeeShop(state, action);
    case actionTypes.COFFEE_SHOP_SET_REVIEWS:
      return setCoffeeShopReviews(state, action);
    case actionTypes.COFFEE_SHOP_SET_LOADING:
      return setLoading(state, action);
    // case actionTypes.COFFEE_SHOP_GET_DATA_SUCCESS:
    //   return getCoffeeShopSuccess(state, action);
    case actionTypes.COFFEE_SHOP_SET_DATA_SUCCESS:
      return setCoffeeShopDataSuccess(state, action);
    case actionTypes.COFFEE_SHOP_GET_BOOKMARK_SUCCESS:
      return getBookmarkSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
