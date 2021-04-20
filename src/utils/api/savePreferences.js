import axios from 'axios';

const savePreferences = async (preference) => {
	const localId = localStorage.getItem('localId');
	const url = `${process.env.REACT_APP_DB}/users/${localId}/preference.json`;

	try {
		return await axios.put(url, preference);
	} catch (error) {
		throw new Error('Terjadi gangguan koneksi. Mohon coba lagi');
	}
};

export default savePreferences;
