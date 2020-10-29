const geocode = async (address) => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyB8OpucomWdxKs4WaIpJYsa7xdd2b6V880`
  );

  const json = await response.json();
  const lat = json.results[0].geometry.location.lat;
  const long = json.results[0].geometry.location.lng;

  console.log(lat, long);

  return { lat, long };
};

export default geocode;
