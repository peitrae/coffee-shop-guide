import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Price, Location, Service, Ambience } from '../Preferences';
import Modal from '../../components/UI/Modal';
import Spinner from '../../components/UI/Spinner';
import savePreferences from '../../utils/api/savePreferences';
import * as actions from '../../store/actions/member';

const EditPreferences = ({ preferences, handleClose }) => {
	const dispatch = useDispatch();

	const [state, setState] = useState({
		loading: false,
		error: null,
	});
	const [showPreference, setShowPreference] = useState(0);
	const [editedPreferences, setEditedPreferences] = useState(preferences);

	const labels = {
		price: {
			title: 'Preferensi Harga',
			question: 'Berapa budget kamu untuk segelas kopi?',
			options: [
				{ value: 1, label: '3K - 18K' },
				{ value: 2, label: '18K - 33K' },
				{ value: 3, label: '33K - 48K' },
				{ value: 4, label: '> 48K' },
			],
		},
		location: {
			title: 'Preferensi Lokasi',
			question:
				'Dalam skala 1 sampai 5, berapa nilai lokasi kedai kopi yang menjadi preferensi kamu.',
			indicators: {
				accessibility: 'Accessibility',
				traffic: 'Traffic',
				parking: 'Parking Lot',
				comfortability: 'Comfortability',
			},
		},
		service: {
			title: 'Preferensi Pelayanan',
			question:
				'Dalam skala 1 sampai 5, berapa nilai pelayanan kedai kopi yang menjadi preferensi kamu.',
			indicators: {
				attentiveness: 'Attentiveness',
				promotion: 'Promotion',
				responsiveness: 'Responsiveness',
				friendliness: 'Friendliness',
			},
		},
		ambience: {
			title: 'Preferensi Suasana',
			question:
				'Dalam skala 1 sampai 5, berapa nilai suasana kedai kopi yang menjadi preferensi kamu.',
			indicators: {
				design: 'Design and layout',
				lightning: 'Lightning',
				music: 'Music',
				cleanliness: 'Cleanliness',
				temperature: 'Temperature',
			},
		},
	};

	const handlePriceOptClicked = (e) => {
		const value = +e.target.value;

		setEditedPreferences({ ...editedPreferences, price: value });
	};

	const handleLocationOptClicked = (id, value) => {
		const location = { ...editedPreferences.location };
		location[id] = value;
		setEditedPreferences({ ...editedPreferences, location });
	};

	const handleServiceOptClicked = (id, value) => {
		const service = { ...editedPreferences.service };
		service[id] = value;
		setEditedPreferences({ ...editedPreferences, service });
	};

	const handleAmbienceOptClicked = (id, value) => {
		const ambience = { ...editedPreferences.ambience };
		ambience[id] = value;
		setEditedPreferences({ ...editedPreferences, ambience });
	};

	const handleNextQuestion = () => setShowPreference(showPreference + 1);

	const handleBackQuestion = () => setShowPreference(showPreference - 1);

	const handleSubmitPreference = async () => {
		setState({ ...state, loading: true });
		try {
			const response = await savePreferences(editedPreferences);

			actions.setPreferenceSuccess(editedPreferences);
			dispatch(actions.setPreferenceSuccess(response.data));

			setState({ ...state, loading: false });

			handleClose();
		} catch (e) {
			setState({ ...state, error: e.message });
		}
	};

	const preferenceComponents = [
		<Price
			title={labels.price.title}
			question={labels.price.question}
			options={labels.price.options}
			value={editedPreferences.price}
			handleOptionClicked={handlePriceOptClicked}
			handleNext={handleNextQuestion}
			handleClose={handleClose}
		/>,
		<Location
			title={labels.location.title}
			question={labels.location.question}
			labels={labels.location.indicators}
			values={editedPreferences.location}
			handleOptionClicked={handleLocationOptClicked}
			handleNext={handleNextQuestion}
			handleBack={handleBackQuestion}
			handleClose={handleClose}
		/>,
		<Service
			title={labels.service.title}
			question={labels.service.question}
			labels={labels.service.indicators}
			values={editedPreferences.service}
			handleOptionClicked={handleServiceOptClicked}
			handleNext={handleNextQuestion}
			handleBack={handleBackQuestion}
			handleClose={handleClose}
		/>,
		<Ambience
			title={labels.ambience.title}
			question={labels.ambience.question}
			labels={labels.ambience.indicators}
			values={editedPreferences.ambience}
			error={state.error}
			handleOptionClicked={handleAmbienceOptClicked}
			handleSubmit={handleSubmitPreference}
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

	return preferenceComponents[showPreference];
};

export default EditPreferences;
