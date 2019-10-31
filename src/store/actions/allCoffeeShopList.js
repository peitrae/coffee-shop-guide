import * as actionTypes from "./actionTypes";

export const getAllCoffeeShopList = () => {
  return {
    type: actionTypes.ALL_COFFEE_SHOP_LIST_GET_DATA
  };
};

export const getAllCoffeeShopListSuccess = data => {
  return {
    type: actionTypes.ALL_COFFEE_SHOP_LIST_GET_DATA_SUCCESS,
    data
  };
};
