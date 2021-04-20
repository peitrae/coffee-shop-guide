import React, { useState } from 'react';

import Modal from '../../components/UI/Modal';
import ErrorMessage from '../../components/ErrorMessage';
import Button from '../../components/UI/Button';
import PreferenceItem from './_PreferenceItem';

const Ambience = ({
	title,
	question,
	values,
	labels,
	handlePreferenceClicked,
	handleSubmit,
	handleBack,
	handleClose,
}) => {
	const [error, setError] = useState(null);

	const handleClickSubmit = () => {
		for (let key in values) {
			if (values[key] === null) {
				setError('Silahkan isi pilihan berikut');
				return;
			}
		}

		handleSubmit();
	};

	return (
		<Modal className="preferences multi-preferences" handleClose={handleClose}>
			<h1 className="preferences__title">{title}</h1>
			<span className="preferences__question">{question}</span>
			{error && <ErrorMessage>{error}</ErrorMessage>}
			<form className="preferences__form">
				{Object.keys(labels).map((key) => (
					<PreferenceItem
						key={key}
						id={key}
						label={labels[key]}
						value={values[key]}
						isDanger={error && values[key] === null}
						className="preferences_item"
						handlePreferenceClicked={handlePreferenceClicked}
					/>
				))}
			</form>
			<div className="preferences__controls">
				<Button type="text" size="sm" onClick={handleBack}>
					Kembali
				</Button>
				<Button type="text" size="sm" onClick={handleClickSubmit}>
					Kirim
				</Button>
			</div>
		</Modal>
	);
};

export default Ambience;
