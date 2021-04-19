import axios from "axios";

const getCoffeeShopById = async (coffeeShopId) => {
  const url = `${process.env.REACT_APP_DB}/coffeeshop/${coffeeShopId}.json`;

  try {
    const { data: coffeeShop } = await axios.get(url);

    return {
      ...coffeeShop,
      id: coffeeShopId,
    };
  } catch (error) {
    console.log(error);
  }
};

export default getCoffeeShopById;
