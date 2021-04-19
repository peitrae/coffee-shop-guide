import axios from "axios";

const getCoffeeShops = async (
  url = `${process.env.REACT_APP_DB}/coffeeshop.json`
) => {
  try {
    const { data } = await axios.get(url);

    const temp = [];
    for (let key in data) {
      temp.push({
        ...data[key],
        id: key,
      });
    }

    return temp;
  } catch (error) {
    console.log(error.response.data.error.message);
  }
};

export default getCoffeeShops;
