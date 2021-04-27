import geocode from '../../../utils/geocode';

const validate = async (coffeeShop) => {
	if (!coffeeShop.name) {
		return {
			validationError: { name: 'Nama kedai kopi kosong.' },
		};
	} // Show error if name is empty

	if (!coffeeShop.address) {
		return {
			validationError: { address: 'Alamat kedai kopi kosong.' },
		};
	} // Show error if address is empty

	coffeeShop.operationalHours = coffeeShop.operationalHours.filter(
		(operationalHour) => {
			const isEmpty =
				Object.keys(operationalHour).length === 0 &&
				operationalHour.constructor === Object;
			const isValueValid =
				operationalHour.day !== undefined &&
				operationalHour.open &&
				operationalHour.close;

			return !isEmpty && isValueValid;
		}
	);

	try {
		const location = await geocode(coffeeShop.address);
		// // Populate coffeeshop with location
		return { validatedCoffeeShop: { ...coffeeShop, location } };
	} catch (err) {
		return {
			validationError: {
				address:
					'Lokasi tidak ditemukan, silahkan cek kembali alamat kedai kopi.',
			},
		};
	}
};

export default validate;
