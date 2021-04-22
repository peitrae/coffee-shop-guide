import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { Price, Location, Service, Ambience } from '../Preferences';
import Modal from '../../components/UI/Modal';
import Spinner from '../../components/UI/Spinner';
import savePreferences from '../../utils/api/savePreferences';
import * as actions from '../../store/actions/member';

const AddPreference = ({ handleClose }) => {
	const dispatch = useDispatch();
	const history = useHistory();

	const [state, setState] = useState({
		loading: false,
		error: null,
	});
	const [showPreference, setShowPreference] = useState(0);
	const [preferences, setPreferences] = useState({
		price: null,
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
	});

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

		setPreferences({ ...preferences, price: value });
	};

	const handleLocationOptClicked = (id, value) => {
		const location = { ...preferences.location };
		location[id] = value;
		setPreferences({ ...preferences, location });
	};

	const handleServiceOptClicked = (id, value) => {
		const service = { ...preferences.service };
		service[id] = value;
		setPreferences({ ...preferences, service });
	};

	const handleAmbienceOptClicked = (id, value) => {
		const ambience = { ...preferences.ambience };
		ambience[id] = value;
		setPreferences({ ...preferences, ambience });
	};

	const handleNextQuestion = () => setShowPreference(showPreference + 1);

	const handleBackQuestion = () => setShowPreference(showPreference - 1);

	const handleSubmitPreference = async () => {
		setState({ ...state, loading: true });
		try {
			const response = await savePreferences(preferences);

			actions.setPreferenceSuccess(preferences);
			dispatch(actions.setPreferenceSuccess(response.data));

			setState({ ...state, loading: false });
			history.push('/search');
		} catch (e) {
			setState({ ...state, error: e.message });
		}
	};

	const preferenceComponents = [
		<Price
			title={labels.price.title}
			question={labels.price.question}
			options={labels.price.options}
			value={preferences.price}
			handleOptionClicked={handlePriceOptClicked}
			handleNext={handleNextQuestion}
			handleClose={handleClose}
		/>,
		<Location
			title={labels.location.title}
			question={labels.location.question}
			labels={labels.location.indicators}
			values={preferences.location}
			handleOptionClicked={handleLocationOptClicked}
			handleNext={handleNextQuestion}
			handleBack={handleBackQuestion}
			handleClose={handleClose}
		/>,
		<Service
			title={labels.service.title}
			question={labels.service.question}
			labels={labels.service.indicators}
			values={preferences.service}
			handleOptionClicked={handleServiceOptClicked}
			handleNext={handleNextQuestion}
			handleBack={handleBackQuestion}
			handleClose={handleClose}
		/>,
		<Ambience
			title={labels.ambience.title}
			question={labels.ambience.question}
			labels={labels.ambience.indicators}
			values={preferences.ambience}
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

export default AddPreference;
