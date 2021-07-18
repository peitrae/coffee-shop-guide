import axios from 'axios';

const getCoffeeShops = async (
	url = `${process.env.REACT_APP_DB}/coffeeshop.json`
) => {
	try {
		const { data } = await axios.get(url);

		const coffeeShops = [];
		for (let key in data) {
			coffeeShops.push({
				...data[key],
				id: key,
			});
		}

		return coffeeShops;
	} catch (error) {
		console.log(error.response?.data.error.message);
	}
};

export default getCoffeeShops;
