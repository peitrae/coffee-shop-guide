const filterCashless = (coffeeShops) => {
  const hasCashless = [];
  const cashless = {
    "Debit/Credit Card": true,
    OVO: true,
    Gopay: true,
  };

  for (let x = 0; x < coffeeShops.length; x++) {
    if (coffeeShops[x].facilities) {
      for (let y = 0; y < coffeeShops[x].facilities.length; y++) {
        if (cashless[coffeeShops[x].facilities[y]]) {
          hasCashless.push(coffeeShops[x]);
          break;
        }
      }
    }
  }

  return hasCashless;
};

export default filterCashless;
