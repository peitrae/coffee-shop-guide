import * as actionTypes from "./actionTypes";

export const getCoffeeShopData = (coffeeShopId) => {
  return {
    type: actionTypes.COFFEE_SHOP_GET_DATA,
    coffeeShopId,
  };
};

export const getCoffeeShopDataSuccess = (data) => {
  return {
    type: actionTypes.COFFEE_SHOP_GET_DATA_SUCCESS,
    data,
  };
};

export const setCoffeeShopData = (coffeeShopData, coffeeShopId, history) => {
  return {
    type: actionTypes.COFFEE_SHOP_SET_DATA,
    coffeeShopData,
    coffeeShopId,
    history,
  };
};

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

export const setCoffeeShopPromo = (promo, coffeeShopId) => ({
  type: actionTypes.COFFEE_SHOP_SET_PROMO,
  promo,
  coffeeShopId,
});

export const getCoffeeShopPromo = (coffeeShopId) => ({
  type: actionTypes.COFFEE_SHOP_GET_PROMO,
  coffeeShopId,
});

export const getCoffeeShopPromoSuccess = (promo) => ({
  type: actionTypes.COFFEE_SHOP_GET_PROMO_SUCCESS,
  promo,
});

export const deleteCoffeeShopPromo = (promoId, coffeeShopId) => ({
  type: actionTypes.COFFEE_SHOP_DELETE_PROMO,
  promoId,
  coffeeShopId
});

