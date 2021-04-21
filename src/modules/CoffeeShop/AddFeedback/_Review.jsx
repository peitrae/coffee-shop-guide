import React from 'react';

import Modal from '../../../components/UI/Modal';
import ErrorMessage from '../../../components/ErrorMessage';
import { Button } from '../../../components/UI/Button';
import TextArea from '../../../components/UI/TextArea';

const Review = ({
	title,
	error,
	question,
	value,
	handleInputChange,
	handleSubmit,
	handleBack,
	handleClose,
}) => (
	<Modal className="preferences" handleClose={handleClose}>
		<h1 className="preferences__title">{title}</h1>
		<span className="preferences__question">{question}</span>
		{error && <ErrorMessage>{error}</ErrorMessage>}
		<form className="preferences__form">
			<TextArea
				placeholder="Kedai kopi ini..."
				value={value || ''}
				onChange={handleInputChange}
				className="review__input"
			/>
		</form>
		<div className="preferences__controls">
			<Button type="text" size="sm" onClick={handleBack}>
				Kembali
			</Button>
			<Button type="text" size="sm" onClick={handleSubmit}>
				Kirim
			</Button>
		</div>
	</Modal>
);

export default Review;
