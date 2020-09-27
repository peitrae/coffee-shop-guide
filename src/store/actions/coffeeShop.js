import * as actionTypes from "./actionTypes";

export const getCoffeeShopData = coffeeShopId => {
  return {
    type: actionTypes.COFFEE_SHOP_GET_DATA,
    coffeeShopId
  };
};

export const getCoffeeShopDataSuccess = data => {
  return {
    type: actionTypes.COFFEE_SHOP_GET_DATA_SUCCESS,
    data
  };
};

export const setCoffeeShopData = (coffeeShopData, coffeeShopId, history) => {
  return {
    type: actionTypes.COFFEE_SHOP_SET_DATA,
    coffeeShopData,
    coffeeShopId,
    history
  }
}

export const getBookmark = (coffeeShopIds) => {
  return {
    type: actionTypes.COFFEE_SHOP_GET_BOOKMARK,
    coffeeShopIds,
  };
};

export const getBookmarkSuccess = (coffeeShops) => {
  return {
    type: actionTypes.COFFEE_SHOP_GET_BOOKMARK_SUCCESS,
    coffeeShops,
  };
};