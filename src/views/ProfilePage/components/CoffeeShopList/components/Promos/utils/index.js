import axios from "axios";

export const getPromos = async (coffeeShopId) => {
  const url = `${process.env.REACT_APP_DB}/coffeeshop/${coffeeShopId}/promo.json`;

  try {
    const { data: promos } = await axios.get(url);

    return {
      coffeeShopId,
      promos,
    };
  } catch (error) {
    return { error: error?.response.data.error.message };
  }
};

export const addPromo = async (promo, coffeeShopId) => {
  const url = `${process.env.REACT_APP_DB}/coffeeshop/${coffeeShopId}/promo.json`;

  try {
    await axios.post(url, { value: promo });

    return await getPromos(coffeeShopId);
  } catch (error) {
    return { error: error?.response.data.error.message };
  }
};

export const editPromo = async (promo, promoId, coffeeShopId) => {
  const url = `${process.env.REACT_APP_DB}/coffeeshop/${coffeeShopId}/promo/${promoId}.json`;

  try {
    await axios.put(url, { value: promo });

    return await getPromos(coffeeShopId);
  } catch (error) {
    return { error: error?.response.data.error.message };
  }
};

export const deletePromo = async (promoId, coffeeShopId) => {
  const url = `${process.env.REACT_APP_DB}/coffeeshop/${coffeeShopId}/promo/${promoId}.json`;
  try {
    await axios.delete(url);

    return await getPromos(coffeeShopId);
  } catch (error) {
    return { error: error?.response.data.error.message };
  }
};
