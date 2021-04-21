import axios from 'axios';

const saveReview = async (feedback, coffeeShopId) => {
	const localId = localStorage.getItem('localId');
	const url = `${process.env.REACT_APP_DB}/coffeeshop/${coffeeShopId}/feedback/${localId}.json`;

	try {
		return axios.put(url, feedback);
	} catch (error) {
		throw new Error(error);
	}
};

export default saveReview;
