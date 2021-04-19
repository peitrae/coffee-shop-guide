const filterWifi = (coffeeShops) => {
  return coffeeShops.filter((coffeeShop) =>
    coffeeShop.facilities?.includes("Wifi")
  );
};

export default filterWifi;
