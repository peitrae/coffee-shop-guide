import { isPointWithinRadius } from "geolib";

const filterRadius = async (coffeeShops, radius) => {
  try {
    const pos = await new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition(res, rej);
    });

    return coffeeShops.filter(({ location }) => {
      if (!location) {
        return false;
      }

      return isPointWithinRadius(
        { latitude: location.lat, longitude: location.long },
        { latitude: pos.coords.latitude, longitude: pos.coords.longitude },
        radius
      );
    });
  } catch (error) {
    return [];
  }
};

export default filterRadius;
