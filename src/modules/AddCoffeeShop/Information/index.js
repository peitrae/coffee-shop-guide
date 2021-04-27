import React from 'react';

import Card from '../../../components/UI/Card';
import AveragePrice from './AveragePrice';
import Contact from './Contact';
import OperationalHours from './OperationalHours';
import Facilities from './Facilities';

const Information = ({
	averagePrice,
	contact,
	facilities,
	operationalHours,
	updateCoffeeShop,
	updateError,
}) => (
	<Card className="information margin-b-16">
		<h2 className="add-coffeeshop__title">Informasi</h2>
		<div className="row">
			<AveragePrice
				value={averagePrice}
				onChange={(e) => updateCoffeeShop({ [e.target.name]: e.target.value })}
			/>
			<Contact
				value={contact}
				onChange={(e) => updateCoffeeShop({ [e.target.name]: e.target.value })}
			/>
			<OperationalHours
				operationalHours={operationalHours}
				updateCoffeeShop={updateCoffeeShop}
				updateError={updateError}
			/>
			<Facilities facilities={facilities} updateCoffeeShop={updateCoffeeShop} />
		</div>
	</Card>
);

export default Information;
