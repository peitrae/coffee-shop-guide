const filterPrice = (coffeeShops, price) => {
  return coffeeShops.filter(({ averagePrice }) => {
    switch (price) {
      case 1:
        return averagePrice >= 3000 && averagePrice <= 18000;
      case 2:
        return averagePrice > 18000 && averagePrice <= 33000;
      case 3:
        return averagePrice > 33000 && averagePrice <= 48000;
      case 4:
        return averagePrice > 48000;
      default: return null;
    }
  });
};

export default filterPrice;
