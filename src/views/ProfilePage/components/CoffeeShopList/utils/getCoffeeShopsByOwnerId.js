import axios from "axios";

const getCoffeeShopsByOwnerId = async (localId) => {
  const url = `${process.env.REACT_APP_DB}/coffeeshop.json?orderBy="uploadedBy"&equalTo="${localId}"`;

  try {
    const response = await axios.get(url);

    const coffeeShops = [];
    for (let key in response.data) {
      coffeeShops.push({
        ...response.data[key],
        id: key,
      });
    }

    return coffeeShops;
  } catch (error) {
    console.log(error.response.data.error.message);
  }
};

export default getCoffeeShopsByOwnerId;
