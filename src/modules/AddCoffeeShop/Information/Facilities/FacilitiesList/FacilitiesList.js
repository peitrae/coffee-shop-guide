import React from 'react';

import FacilitiesItem from "./FacilitiesItem"

const FacilitiesList = ({ facilities = [], handleDeleteFacilities }) => (
	<div className="facilities__list margin-b-6">
		{facilities.map((facility, index) => (
			<FacilitiesItem key={index} handleDelete={handleDeleteFacilities(index)}>
				{facility}
			</FacilitiesItem>
		))}
	</div>
);

export default FacilitiesList;
