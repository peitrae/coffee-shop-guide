  const withinRadius = async (coffeeShops, radius) => {
    testing && path.push("1");
    testing && path.push("2");
    testing && path.push("3");
    try {
      testing && path.push("4");
      const pos = await new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej);
      });

      testing && path.push("5");
      const coffeeShopsTemp = [];
      let x = 0;

      while (x < coffeeShops.length) {
        testing && path.push("6")
        testing && path.push("7")
        if (!coffeeShops[x].location) {
          testing && path.push("8")
          x++;
          continue;
        }

        testing && path.push("9")
        if (
          isPointWithinRadius(
            { latitude: coffeeShops[x].location.lat, longitude: coffeeShops[x].location.long },
            { latitude: pos.coords.latitude, longitude: pos.coords.longitude },
            radius
          )
        ) {
          testing && path.push("10")
          coffeeShopsTemp.push(coffeeShops[x]);
        }

        testing && path.push("11")
        x++;
      }

      testing && path.push("12")
      return coffeeShopsTemp;
    } catch (error) {
      testing && path.push("13")
      testing && path.push("14")
      return { error };
    }
  };

  testing && console.log("PATH", path.join("-"));
  path = [];