import axios from 'axios';

const addCoffeeShop = async (coffeeShop) => {
	const url = `${process.env.REACT_APP_DB}/coffeeshop.json`;

	try {
		const resCoffeeShop = await axios.post(url, coffeeShop);
		const coffeeShopId = resCoffeeShop.data.name;

		return coffeeShopId;
	} catch (error) {
		console.log(error.response.data.error.message);
	}
};

export default addCoffeeShop;
