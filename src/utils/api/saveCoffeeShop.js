import axios from "axios";

const saveCoffeeShop = async (coffeeShopId, coffeeShop) => {
  const updateUrl = `${process.env.REACT_APP_DB}/coffeeshop/${coffeeShopId}.json`;
  const addUrl = `${process.env.REACT_APP_DB}/coffeeshop.json`;

  try {
    if (coffeeShopId) {
      await axios.put(updateUrl, coffeeShop);
    } else {
      const response = await axios.post(addUrl, coffeeShop);
      coffeeShopId = response.data.name;
    }

    return coffeeShopId;
  } catch (error) {
    console.log(error.response.data.error.message);
  }
};

export default saveCoffeeShop;
