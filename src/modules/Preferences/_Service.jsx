import React, { useState } from 'react';

import Modal from '../../components/UI/Modal';
import ErrorMessage from '../../components/ErrorMessage';
import Button from '../../components/UI/Button';
import PreferenceItem from './_PreferenceItem';

const Service = ({
	title,
	question,
	values,
	labels,
	handleOptionClicked,
	handleNext,
	handleSubmit,
	handleBack,
	handleClose,
}) => {
	const [error, setError] = useState(null);

	const validate = () => {
		for (let key in values) {
			if (values[key] === null) {
				setError('Silahkan isi pilihan berikut');
				return false;
			}
		}

		return true;
	};

	const handleClickNext = () => {
		const isValidated = validate();

		if (isValidated) {
			handleNext();
		}
	};

	const handleClickSubmit = () => {
		const isValidated = validate();

		if (isValidated) {
			handleSubmit();
		}
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
						handleOptionClicked={handleOptionClicked}
					/>
				))}
			</form>
			<div className="preferences__controls">
				{handleBack ? (
					<Button type="text" size="sm" onClick={handleBack}>
						Kembali
					</Button>
				) : handleClose ? (
					<Button type="text" size="sm" onClick={handleClose}>
						Tutup
					</Button>
				) : null}
				{handleNext ? (
					<Button type="text" size="sm" onClick={handleClickNext}>
						Selanjutnya
					</Button>
				) : handleSubmit ? (
					<Button type="text" size="sm" onClick={handleClickSubmit}>
						Kirim
					</Button>
				) : null}
			</div>
		</Modal>
	);
};

export default Service;
