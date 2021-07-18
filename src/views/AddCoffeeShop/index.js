import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import Navbar from '../../components/UI/Navbar';
import { Button } from '../../components/UI/Button';
import HeaderPict from '../../assets/Header.png';
import Spinner from '../../components/UI/Spinner';
import Footer from '../../components/UI/Footer';
import ErrorMessage from '../../components/ErrorMessage';
import {
	Header as AddHeader,
	Information as AddInformation,
	Images as AddImages,
} from '../../modules/AddCoffeeShop';

import validate from '../../modules/AddCoffeeShop/utils/validate';
import addCoffeeShop from '../../modules/AddCoffeeShop/utils/addCoffeeShop';

const AddCoffeeShop = () => {
	const history = useHistory();

	const localId = useSelector(({ member }) => member.localId);

	const [coffeeShop, setCoffeeShop] = useState({
		header: HeaderPict,
		name: undefined,
		address: undefined,
		averagePrice: 0,
		contact: undefined,
		facilities: [],
		operationalHours: [],
		images: [],
		uploadedBy: localId,
	});

	const {
		header,
		name,
		address,
		averagePrice,
		contact,
		facilities,
		operationalHours,
		images,
	} = coffeeShop;

	const [uploading, setUploading] = useState({
		header: false,
		images: false,
	});

	const [error, setError] = useState({
		name: false,
		address: false,
		timepicker: false,
	});

	const updateUploading = (state) => setUploading({ ...uploading, ...state });

	const updateCoffeeShop = (state) => {
		setCoffeeShop({ ...coffeeShop, ...state });
	};

	const updateError = (state) => setError({ ...error, ...state });

	const handleSubmit = async (e) => {
		e.preventDefault();

		const { validatedCoffeeShop, validationError } = await validate(coffeeShop);

		if (validationError) {
			updateError(validationError);
		} else {
			const newCoffeeShopId = await addCoffeeShop(validatedCoffeeShop);

			history.push(`/coffee-shop/${newCoffeeShopId}`);
		}
	};

	const isError = error.name || error.address || error.timepicker;
	const isUploading = uploading.header || uploading.images;

	if (!localId) {
		return <Spinner />;
	}

	return (
		<>
			<Navbar />
			<div className="add-coffeeshop">
				<div className="add-coffeeshop__container">
					<form>
						<AddHeader
							header={header}
							isHeaderUploading={uploading.header}
							name={name}
							address={address}
							error={error}
							updateCoffeeShop={updateCoffeeShop}
							updateError={updateError}
							updateUploading={updateUploading}
						/>
						<AddInformation
							averagePrice={averagePrice}
							contact={contact}
							facilities={facilities}
							operationalHours={operationalHours}
							updateCoffeeShop={updateCoffeeShop}
							updateError={updateError}
						/>
						<AddImages
							images={images}
							localId={localId}
							updateCoffeeShop={updateCoffeeShop}
							updateUploading={updateUploading}
						/>
						{isError && (
							<ErrorMessage className="margin-b-8">{isError}</ErrorMessage>
						)}
						<Button
							size="lg"
							className="add-coffeeshop__btn-submit"
							onClick={handleSubmit}
							disabled={isUploading || isError}
						>
							Simpan
						</Button>
					</form>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default AddCoffeeShop;
