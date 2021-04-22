import axios from 'axios';

const populateReviews = async (feedback) => {
	const url = process.env.REACT_APP_FUNCTIONS;
	const userIds = Object.keys(feedback);

	try {
		const response = await axios.post(url, { userIds });
		const users = response.data.users;

		return users.map((user) => {
			const {
				location: { accessibility, comfortability, parking, traffic },
				service: { attentiveness, friendliness, promotion, responsiveness },
				ambience: { cleanliness, design, lightning, music, temperature },
			} = feedback[user.uid].rating;

			const rating =
				(accessibility +
					comfortability +
					parking +
					traffic +
					attentiveness +
					friendliness +
					promotion +
					responsiveness +
					cleanliness +
					design +
					lightning +
					music +
					temperature) /
				13;

			return {
				user_id: user.uid,
				name: user.displayName,
				photoURL: user.photoURL,
				rating: +rating.toFixed(1),
				review: feedback[user.uid].review,
				created_at: feedback[user.uid].created_at,
			};
		});
	} catch (error) {
		throw error;
	}
};

export default populateReviews;
