// const geocode = async (address) => {
//  return { lat: 0, long: 0 };
// };

// export default geocode;

const geocode = async (address) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_MAPS_API}`
    );

    console.log("Geocode Response", response);

    const json = await response.json();

    if (!json.results.length) {
      throw Error("Location information is unavailable. Check your address.");
    }

    const lat = json.results[0].geometry.location.lat;
    const long = json.results[0].geometry.location.lng;

    return { lat, long };
  } catch (error) {
    console.log(error);

    throw Error(error);
  }
};

export default geocode;
