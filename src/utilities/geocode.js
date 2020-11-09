const geocode = async (address) => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_MAPS_API}`
  );

  const json = await response.json();
  const lat = json.results[0].geometry.location.lat;
  const long = json.results[0].geometry.location.lng;

  return { lat, long };
};

export default geocode;
