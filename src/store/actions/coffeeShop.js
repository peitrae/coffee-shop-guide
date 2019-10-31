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

export const setCoffeeShopData = (coffeeShopData, coffeeShopId) => {
  return {
    type: actionTypes.COFFEE_SHOP_SET_DATA,
    coffeeShopData,
    coffeeShopId
  }
}

export const setCoffeeShopDataSuccess = (data, redirect) => {
  console.log("setCoffeeShopDataSuccess", redirect)
  return {
    type: actionTypes.COFFEE_SHOP_SET_DATA_SUCCESS,
    data,
    redirect
  }
}