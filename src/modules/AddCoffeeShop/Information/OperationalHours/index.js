import React from 'react';

import { Button } from '../../../../components/UI/Button';
import { ReactComponent as PlusIcon } from '../../../../assets/svg/plus.svg';
import OperationalHoursItem from './OperationalHoursItem';

const OperationalHours = ({
	operationalHours = [],
  error,
	updateCoffeeShop,
	updateError,
}) => {
	const filterDaysOption = () => {
		const days = {
			0: 'Minggu',
			1: 'Senin',
			2: 'Selasa',
			3: 'Rabu',
			4: 'Kamis',
			5: 'Jumat',
			6: 'Sabtu',
		};

		for (let item of operationalHours) {
			delete days[item.day];
		}

		return days;
	};

	const handleDayChange = (e, day, index) => {
		e.preventDefault();

		let temp = [...operationalHours];
		temp[index] = { ...temp[index], day: parseInt(day) };
		temp = temp.sort((a, b) => a.day - b.day);

		updateCoffeeShop({ operationalHours: temp });
	};

	const handleSubmitOpen = (open, index) => {
		let temp = [...operationalHours];
		temp[index].open = open;

		updateCoffeeShop({ operationalHours: temp });
	};

	const handleSubmitClose = (close, index) => {
		let temp = [...operationalHours];
		temp[index].close = close;

		updateCoffeeShop({ operationalHours: temp });
	};

	const handleAddDays = (e) => {
		e.preventDefault();
		const temp = [...operationalHours];
		temp.push({});

		updateCoffeeShop({ operationalHours: temp });
	};

	const handleDayDelete = (index) => (e) => {
		e.preventDefault();
		const temp = [...operationalHours];
		temp.splice(index, 1);

		updateCoffeeShop({ operationalHours: temp });
	};

	return (
		<div className="col margin-v-8 operational-hours">
			<label className="add-coffeeshop__label">Jam Buka</label>
			<div>
				{operationalHours.map((item, index) => (
					<OperationalHoursItem
						key={index}
						index={index}
						item={item}
						daysOptions={filterDaysOption()}
						handleDayChange={handleDayChange}
						handleSubmitOpen={handleSubmitOpen}
						handleSubmitClose={handleSubmitClose}
						handleDayDelete={handleDayDelete}
						updateError={updateError}
					/>
				))}
				{operationalHours.length < 7 ? (
					<Button size="sm" type="text" onClick={handleAddDays} icon={PlusIcon}>
						Tambah hari
					</Button>
				) : null}
			</div>
		</div>
	);
};

export default OperationalHours;
