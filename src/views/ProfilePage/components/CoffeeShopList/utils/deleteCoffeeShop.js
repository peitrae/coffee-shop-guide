import axios from "axios";
import getCoffeeShopsByOwnerId from "./getCoffeeShopsByOwnerId";

const deleteCoffeeShop = async (coffeeShopId) => {
  const localId = localStorage.getItem("localId");
  const url = `${process.env.REACT_APP_DB}/coffeeshop/${coffeeShopId}.json`;

  try {
    await axios.delete(url);

    const coffeeShops = await getCoffeeShopsByOwnerId(localId);

    return coffeeShops;
  } catch (error) {
    console.log(error);
  }
};

export default deleteCoffeeShop;
