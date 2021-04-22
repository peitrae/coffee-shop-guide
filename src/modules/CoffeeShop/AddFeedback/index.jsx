import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Location, Service, Ambience } from '../../Preferences';
import Modal from '../../../components/UI/Modal';
import Spinner from '../../../components/UI/Spinner';
import Review from './_Review';
import * as actions from '../../../store/actions';
import saveReview from '../../../utils/api/saveReview';

const AddReview = ({ coffeeShopId, handleClose }) => {
	const dispatch = useDispatch();

	const [state, setState] = useState({
		loading: false,
		error: null,
	});
	const [showFeedback, setShowPreference] = useState(0);
	const [feedback, setFeedback] = useState({
		rating: {
			location: {
				accessibility: null,
				traffic: null,
				parking: null,
				comfortability: null,
			},
			service: {
				attentiveness: null,
				promotion: null,
				responsiveness: null,
				friendliness: null,
			},
			ambience: {
				design: null,
				lightning: null,
				music: null,
				cleanliness: null,
				temperature: null,
			},
		},
		review: null,
		created_at: new Date(),
	});

	const labels = {
		location: {
			title: 'Review Lokasi',
			question:
				'Dalam skala 1 sampai 5, seberapa puas kamu dengan lokasi kedai kopi ini?',
			indicators: {
				accessibility: 'Aksebilitas',
				traffic: 'Kemacetan',
				parking: 'Parkir',
				comfortability: 'Kenyamanan',
			},
		},
		service: {
			title: 'Review Pelayanan',
			question:
				'Dalam skala 1 sampai 5, seberapa puas kamu dengan pelayanan kedai kopi ini?',
			indicators: {
				attentiveness: 'Perhatian Pelayan',
				promotion: 'Kesesuaian Promo',
				responsiveness: 'Ketanggapan Pelayan',
				friendliness: 'Keramahan Pelayan',
			},
		},
		ambience: {
			title: 'Review Suasana',
			question:
				'Dalam skala 1 sampai 5, seberapa puas kamu dengan suasana kedai kopi ini?',
			indicators: {
				design: 'Desain dan layout',
				lightning: 'Pencahayaan',
				music: 'Musik',
				cleanliness: 'Kebersihan',
				temperature: 'Temperatur',
			},
		},
		review: {
			title: 'Review',
			question:
				'Tambahkan pesan kesan kamu selama mengunjungi kedai kopi ini (opsional)',
		},
	};

	const handleLocationOptClicked = (id, value) => {
		const location = { ...feedback.rating.location };
		location[id] = value;

		setFeedback({
			...feedback,
			rating: { ...feedback.rating, location },
		});
	};

	const handleServiceOptClicked = (id, value) => {
		const service = { ...feedback.rating.service };
		service[id] = value;

		setFeedback({
			...feedback,
			rating: { ...feedback.rating, service },
		});
	};

	const handleAmbienceOptClicked = (id, value) => {
		const ambience = { ...feedback.rating.ambience };
		ambience[id] = value;

		setFeedback({
			...feedback,
			rating: { ...feedback.rating, ambience },
		});
	};

	const handleReviewInputChanged = (e) => {
		setFeedback({
			...feedback,
			review: e.target.value,
		});
	};

	const handleNextQuestion = () => setShowPreference(showFeedback + 1);

	const handleBackQuestion = () => setShowPreference(showFeedback - 1);

	const handleSubmitFeedback = async () => {
		setState({ ...state, loading: true });
		try {
			await saveReview(feedback, coffeeShopId);
			setState({ ...state, loading: false });
			dispatch(actions.getCoffeeShopReviews(coffeeShopId));
			handleClose();
		} catch (error) {
			setState({ loading: false, error: error.message });
		}
	};

	const feedbackComponents = [
		<Location
			title={labels.location.title}
			question={labels.location.question}
			labels={labels.location.indicators}
			values={feedback.rating.location}
			handleOptionClicked={handleLocationOptClicked}
			handleNext={handleNextQuestion}
			handleClose={handleClose}
		/>,
		<Service
			title={labels.service.title}
			question={labels.service.question}
			labels={labels.service.indicators}
			values={feedback.rating.service}
			handleOptionClicked={handleServiceOptClicked}
			handleNext={handleNextQuestion}
			handleBack={handleBackQuestion}
			handleClose={handleClose}
		/>,
		<Ambience
			title={labels.ambience.title}
			question={labels.ambience.question}
			labels={labels.ambience.indicators}
			values={feedback.rating.ambience}
			error={state.error}
			handleOptionClicked={handleAmbienceOptClicked}
			handleNext={handleNextQuestion}
			handleBack={handleBackQuestion}
			handleClose={handleClose}
		/>,
		<Review
			title={labels.review.title}
			question={labels.review.question}
			value={feedback.review}
			error={state.error}
			handleInputChange={handleReviewInputChanged}
			handleSubmit={handleSubmitFeedback}
			handleBack={handleBackQuestion}
			handleClose={handleClose}
		/>,
	];

	if (state.loading) {
		return (
			<Modal className="preferences">
				<Spinner className="preferences__loading" />
			</Modal>
		);
	}

	return feedbackComponents[showFeedback];
};

export default AddReview;
