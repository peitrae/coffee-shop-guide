import { isPointWithinRadius } from "geolib";

const testing = true;
const path = [];

const filterRadius = async (coffeeShops, radius) => {
  testing && path.push("1");
  testing && path.push("2");

  try {
    // const pos = await new Promise((res, rej) => {
    //   navigator.geolocation.getCurrentPosition(res, rej);
    // });

    testing && path.push("3");
    const pos = {
      coords: {
        latitude: -7.983,
        longitude: 112.621,
      },
    };

    testing && path.push("4");
    const coffeeShopTemp = [];
    let x = 0;

    while (x < coffeeShops.length) {
      testing && path.push("5");

      testing && path.push("6");
      if (!coffeeShops[x].location) {
        testing && path.push("7");
        x++;
        continue;
      }

      testing && path.push("8");
      if (
        isPointWithinRadius(
          {
            latitude: coffeeShops[x].location.lat,
            longitude: coffeeShops[x].location.long,
          },
          { latitude: pos.coords.latitude, longitude: pos.coords.longitude },
          radius
        )
      ) {
        testing && path.push("9");
        coffeeShopTemp.push(coffeeShops[x]);
      }

      testing && path.push("10");
      x++;
    }

    testing && path.push("11");
    return coffeeShopTemp;
  } catch (error) {
    testing && path.push("12");
    testing && path.push("13");
    return [];
  }
};

filterRadius()
