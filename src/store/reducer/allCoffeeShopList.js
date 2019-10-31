import * as actionTypes from "../actions/actionTypes";
import { updateState } from "../../shared/utility";

const initialState = {
  lists: null
};

const getAllCoffeeShopListSuccess = (state, action) => {
  return updateState(state, { lists: action.data });
};

const openNowAllCoffeeShopList = (state, action) => {
  return updateState(state, { lists: action.filteredAllCoffeeShopList });
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ALL_COFFEE_SHOP_LIST_GET_DATA_SUCCESS:
      return getAllCoffeeShopListSuccess(state, action);
    case actionTypes.ALL_COFFEE_SHOP_LIST_OPEN_NOW:
      return openNowAllCoffeeShopList(state, action);
    default:
      return state;
  }
};

export default reducer;
