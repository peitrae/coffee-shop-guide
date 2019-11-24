import * as actionTypes from "../actions/actionTypes";
import { updateState } from "../../utilities/updateState";

const initialState = {
  data: null,
  redirect: null
};

const getCoffeeShopDataSuccess = (state, action) => {
  return updateState(state, {
    data: action.data
  });
};

const setCoffeeShopDataSuccess = (state, action) => {
  return updateState(state, {
    data: action.data,
    redirect: action.redirect
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.COFFEE_SHOP_GET_DATA_SUCCESS:
      return getCoffeeShopDataSuccess(state, action);
    case actionTypes.COFFEE_SHOP_SET_DATA_SUCCESS:
      return setCoffeeShopDataSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
