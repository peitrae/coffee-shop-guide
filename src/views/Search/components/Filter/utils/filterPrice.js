const filterPrice = (coffeeShops, price) => {
  return coffeeShops.filter(({ averagePrice }) => {
    switch (price) {
      case 1:
        return averagePrice < 10000;
      case 2:
        return averagePrice >= 10000 && averagePrice < 30000;
      case 3:
        return averagePrice >= 30000 && averagePrice <= 50000;
      case 4:
        return averagePrice > 50000;
      default:
        return averagePrice;
    }
  });
};

export default filterPrice;
