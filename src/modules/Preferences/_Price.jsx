import React, { useState } from 'react';

import Modal from '../../components/UI/Modal';
import ErrorMessage from '../../components/ErrorMessage';
import RadioButton from '../../components/UI/RadioButton';
import Button from '../../components/UI/Button';

const Price = ({
	title,
	question,
	options,
	value,
	handleNext,
	handleClose,
	handleOptionClicked,
}) => {
	const [error, setError] = useState(null);

	const handleClickNext = () => {
		value ? handleNext() : setError('Silahkan isi pilihan berikut');
	};

	return (
		<Modal className="preferences" handleClose={handleClose}>
			<h1 className="preferences__title">{title}</h1>
			<span className="preferences__question">{question}</span>
			{error && <ErrorMessage>{error}</ErrorMessage>}
			<form className="preferences__form">
				<div className="price-preference__radio-grp">
					{options.map((option) => (
						<RadioButton
							key={option.label}
							onClick={handleOptionClicked}
							value={option.value}
							checked={value === option.value}
							className="price-preference__btn-radio"
						>
							{option.label}
						</RadioButton>
					))}
				</div>
			</form>
			<div className="preferences__controls">
				<Button type="text" size="sm" onClick={handleClose}>
					Tutup
				</Button>
				<Button type="text" size="sm" onClick={handleClickNext}>
					Selanjutnya
				</Button>
			</div>
		</Modal>
	);
};

export default Price;
