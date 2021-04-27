import React, { useState } from 'react';

import { Button } from '../../../../components/UI/Button';
import FacilitiesList from './FacilitiesList/FacilitiesList';
import AddFacilitiesMenu from './AddFacilitiesMenu';

import { ReactComponent as PlusIcon } from '../../../../assets/svg/plus.svg';

const Facilities = ({ facilities, updateCoffeeShop }) => {
	const [showFacilitiesMenu, setShowFacilitiesMenu] = useState(false);

	const handleSubmit = (e, facility) => {
		e.preventDefault();

		handleSubmitFacilities(facility);
		setShowFacilitiesMenu(false);
	};

	const handleShowDropdownToogle = (e) => {
		e.preventDefault();
		setShowFacilitiesMenu(!showFacilitiesMenu);
	};

	const handleSubmitFacilities = (facility) => {
		const temp = [...facilities];
		temp.push(facility);
		updateCoffeeShop({ facilities: temp });
	};

	const handleDeleteFacilities = (index) => (e) => {
		e.preventDefault();
		const temp = [...facilities];
		temp.splice(index, 1);
		updateCoffeeShop({ facilities: temp });
	};

	return (
		<div className="col margin-v-8 facilities">
			<label className="add-coffeeshop__label">Fasilitas</label>
			<div className="row">
				<FacilitiesList
					facilities={facilities}
					handleDeleteFacilities={handleDeleteFacilities}
				/>
				<div className="facilities__add">
					<Button
						size="sm"
						type="text"
						onClick={handleShowDropdownToogle}
						icon={PlusIcon}
					>
						Tambah Fasilitas
					</Button>
					{showFacilitiesMenu ? (
						<AddFacilitiesMenu
							facilities={facilities}
							handleSubmit={handleSubmit}
							handleClose={handleShowDropdownToogle}
						/>
					) : null}
				</div>
			</div>
		</div>
	);
};

export default Facilities;
