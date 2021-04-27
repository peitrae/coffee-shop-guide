import axios from 'axios';

const changeCoffeeShop = async (coffeeShopId, coffeeShop) => {
	const url = `${process.env.REACT_APP_DB}/coffeeshop/${coffeeShopId}.json`;

	try {
		await axios.put(url, coffeeShop);

		return coffeeShopId;
	} catch (error) {
		console.log(error.response.data.error.message);
	}
};

export default changeCoffeeShop;
