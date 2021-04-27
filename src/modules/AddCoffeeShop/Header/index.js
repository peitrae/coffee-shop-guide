import React, { useState } from 'react';

import Card from '../../../components/UI/Card';
import HeaderImageGroup from './HeaderImageGroup';
import HeaderInputGroup from './HeaderInputGroup';

import geocode from '../../../utils/geocode';
import uploadImage from '../../../store/firebase/uploadImage';

const Header = ({
	coffeeShopId,
	header,
	isHeaderUploading,
	name,
	address,
	error,
	updateCoffeeShop,
	updateUploading,
	updateError,
}) => {
	const [headerPreview, setHeaderPreview] = useState(null);

	const handleOpenMap = async (e) => {
		e.preventDefault();
		if (!address || address === '') {
			return;
		}

		try {
			const { lat, long } = await geocode(address);
			const url = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${long}`;
			window.open(url, '_blank');
		} catch (error) {
			updateError({
				address:
					'Lokasi tidak ditemukan, silahkan cek kembali alamat kedai kopi.',
			});
		}
	};

	const handleHeaderChange = (e) => {
		const header = e.target.files[0];
		const reference = `coffeeShop/images/${coffeeShopId}`;
		updateUploading({ header: true });

		uploadImage(header, reference)
			.then((response) => {
				updateCoffeeShop({ header: response });
				updateUploading({ header: false });
			})
			.catch((error) => console.log(error));

		let reader = new FileReader();
		reader.onloadend = () => {
			setHeaderPreview(reader.result);
		};
		reader.readAsDataURL(header);
	};

	const handleNameChange = (e) => {
		updateCoffeeShop({ [e.target.name]: e.target.value });

		if (error.name) {
			updateError({ name: false });
		}
	};

	const handleAddressChange = (e) => {
		updateCoffeeShop({ [e.target.name]: e.target.value });

		if (error.address) {
			updateError({ address: false });
		}
	};

	return (
		<Card className="header margin-b-16">
			<HeaderImageGroup
				image={headerPreview || header}
				isHeaderUploading={isHeaderUploading}
				handleHeaderChange={handleHeaderChange}
			/>
			<HeaderInputGroup
				name={name}
				address={address}
				handleNameChange={handleNameChange}
				handleAddressChange={handleAddressChange}
				handleOpenMap={handleOpenMap}
			/>
		</Card>
	);
};

export default Header;
