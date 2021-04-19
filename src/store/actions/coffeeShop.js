import * as actionTypes from "./actionTypes";

export const getCoffeeShop = (coffeeShopId) => ({
  type: actionTypes.COFFEE_SHOP_GET,
  coffeeShopId,
});

export const setCoffeeShop = (coffeeShop) => ({
  type: actionTypes.COFFEE_SHOP_SET,
  coffeeShop,
});

export const setCoffeeShopLoading = (loading) => ({
  type: actionTypes.COFFEE_SHOP_SET_LOADING,
  loading,
});

export const addCoffeeShopReview = (review, coffeeShopId) => ({
  type: actionTypes.COFFEE_SHOP_ADD_REVIEW,
  review,
  coffeeShopId,
});

export const getCoffeeShopReviews = (coffeeShopId) => ({
  type: actionTypes.COFFEE_SHOP_GET_REVIEWS,
  coffeeShopId,
});

export const setCoffeeShopReviews = (reviews) => ({
  type: actionTypes.COFFEE_SHOP_SET_REVIEWS,
  reviews,
});

// ========================

export const getCoffeeShopSuccess = (coffeeShop) => {
  return {
    type: actionTypes.COFFEE_SHOP_GET_DATA_SUCCESS,
    coffeeShop,
    loading: false,
  };
};

export const addCoffeeShop = (coffeeShopData, coffeeShopId, history) => {
  return {
    type: actionTypes.COFFEE_SHOP_ADD,
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
