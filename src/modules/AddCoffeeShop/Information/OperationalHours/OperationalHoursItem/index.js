import React from 'react';

import { CloseCircleButton } from '../../../../../components/UI/Button';
import DayDropdown from './DayDropdown';
import InputTime from './InputTime';

const OperationalHoursItem = ({
	index,
	item: { day, open, close },
	daysOptions,
	error,
	handleDayChange,
	handleSubmitOpen,
	handleSubmitClose,
	handleDayDelete,
	updateError,
}) => (
	<div className="operational-hours__item margin-b-8">
		<div className="margin-r-12 width-25">
			<DayDropdown
				day={day}
				daysOptions={daysOptions}
				index={index}
				onChange={handleDayChange}
			/>
		</div>
		<div className="margin-r-12 width-25">
			<InputTime
				index={index}
				value={open}
				error={error}
				handleSubmit={handleSubmitOpen}
				updateError={updateError}
			/>
		</div>
		<div className="margin-r-12 width-25">
			<InputTime
				index={index}
				value={close}
				error={error}
				handleSubmit={handleSubmitClose}
				updateError={updateError}
			/>
		</div>
		<CloseCircleButton onClick={handleDayDelete(index)} />
	</div>
);

export default OperationalHoursItem;
