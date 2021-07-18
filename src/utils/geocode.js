const geocode = async (address) => {
	const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_MAPS_API}`;

	try {
		const response = await fetch(url);

		const json = await response.json();

		if (!json.results.length) {
			throw Error(
				'Lokasi tidak ditemukan, silahkan cek kembali alamat kedai kopi.'
			);
		}

		const lat = json.results[0].geometry.location.lat;
		const long = json.results[0].geometry.location.lng;

		return { lat, long };
	} catch (error) {
		throw error;
	}
};

export default geocode;
