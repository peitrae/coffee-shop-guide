import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router';

import Navbar from '../../components/UI/Navbar';
import { Button } from '../../components/UI/Button';
import HeaderPict from '../../assets/Header.png';
import Spinner from '../../components/UI/Spinner';
import Footer from '../../components/UI/Footer';
import ErrorMessage from '../../components/ErrorMessage';
import {
	Header as UpdateHeader,
	Information as UpdateInformation,
	Images as UpdateImages,
} from '../../modules/AddCoffeeShop';

import * as actions from '../../store/actions';
import validate from '../../modules/AddCoffeeShop/utils/validate';
import changeCoffeeShop from '../../modules/AddCoffeeShop/utils/changeCoffeeShop';

const UpdateCoffeeShop = () => {
	const dispatch = useDispatch();
	const { id: coffeeShopId } = useParams();
	const history = useHistory();

	const localId = useSelector(({ member }) => member.localId);
	const oldCoffeeShop = useSelector(({ coffeeShop }) => coffeeShop.data);

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

	useEffect(() => {
		if (coffeeShopId) {
			dispatch(actions.getCoffeeShop(coffeeShopId));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [coffeeShopId]);

	useEffect(() => {
		if (coffeeShopId && oldCoffeeShop) {
			setCoffeeShop({ ...coffeeShop, ...oldCoffeeShop });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [coffeeShopId, oldCoffeeShop]);

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
			const newCoffeeShopId = await changeCoffeeShop(
				coffeeShopId,
				validatedCoffeeShop
			);

			history.push(`/coffee-shop/${newCoffeeShopId}`);
			// actions.addCoffeeShop(validatedCoffeeShop, coffeeShopId, history)
		}
	};

	const isError = error.name || error.address || error.timepicker;
	const isUploading = uploading.header || uploading.images;

	if (!oldCoffeeShop) {
		return <Spinner />;
	}

	return (
		<>
			<Navbar />
			<div className="add-coffeeshop">
				<div className="add-coffeeshop__container">
					<form>
						<UpdateHeader
							header={header}
							isHeaderUploading={uploading.header}
							name={name}
							address={address}
							error={error}
							updateCoffeeShop={updateCoffeeShop}
							updateError={updateError}
							updateUploading={updateUploading}
						/>
						<UpdateInformation
							averagePrice={averagePrice}
							contact={contact}
							facilities={facilities}
							operationalHours={operationalHours}
							updateCoffeeShop={updateCoffeeShop}
							updateError={updateError}
						/>
						<UpdateImages
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
							Submit
						</Button>
					</form>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default UpdateCoffeeShop;
