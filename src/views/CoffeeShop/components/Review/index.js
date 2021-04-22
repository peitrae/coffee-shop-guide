import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Card from '../../../../components/UI/Card';
import ReviewItem from './components/ReviewItem';
import Spinner from '../../../../components/UI/Spinner';
import { Button } from '../../../../components/UI/Button';
import populateReviews from './utils/populateReviews';
import ErrorMessage from '../../../../components/ErrorMessage';

const Loading = () => (
	<Card className="review">
		<Spinner />
	</Card>
);

const Error = ({ message, handleTryAgain }) => (
	<Card className="review">
		<h2 className="review__title">Review</h2>
		<div className="review__error">
			<ErrorMessage>{message}</ErrorMessage>
			<Button size="sm" onClick={handleTryAgain}>
				Coba Lagi
			</Button>
		</div>
	</Card>
);

const Review = () => {
	const feedback = useSelector((state) => state.coffeeShop.data.feedback);

	const [reviews, setReviews] = useState([]);
	const [state, setState] = useState({
		loading: true,
		error: null,
	});

	const fetchReviews = async () => {
    setState({ ...state, loading: true });

		try {
			const userReviews = await populateReviews(feedback);

			setReviews(userReviews);
			setState({ ...state, loading: false });
		} catch (error) {
			setState({ error: error.message, loading: false });
		}
	};

	useEffect(() => {
		if (feedback) {
			fetchReviews();
		} // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [feedback]);

	if (!feedback) {
		return null;
	} else if (feedback && state.loading) {
		return <Loading />;
	} else if (state.error) {
		return <Error message={state.error} handleTryAgain={fetchReviews} />;
	}

	return (
		<Card className="review">
			<h2 className="h2 c-primary margin-b-16">Review</h2>
			<div>
				{reviews.map((review) => (
					<ReviewItem key={review.user_id} value={review} />
				))}
			</div>
		</Card>
	);
};

export default Review;
