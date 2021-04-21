import React from 'react';

import { ButtonGroup, ButtonItem } from '../../components/input/ButtonGroup';

const PreferenceItem = ({
	id,
	label,
	isDanger,
	value,
	className,
	handleOptionClicked,
}) => {
	const handleItemClick = (e) => {
		e.preventDefault();
		const value = +e.target.innerText;

		handleOptionClicked(id, value);
	};

	return (
		<div className={`preferences-item ${className}`}>
			<label htmlFor={id} className="preferences-item__label">{label}</label>
			<ButtonGroup
				className="preferences-item__button-group"
				isDanger={isDanger}
			>
				{[...Array(5)].map((_, idx) => {
					const num = idx + 1;

					return (
						<ButtonItem
							key={num}
							id={num}
							type={value === num ? 'solid' : 'outlined'}
							onClick={handleItemClick}
						>
							{num}
						</ButtonItem>
					);
				})}
			</ButtonGroup>
		</div>
	);
};

export default PreferenceItem;
