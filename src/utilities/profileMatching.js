const profileMatching = (preference, coffeeShops) => {
  if (!preference || !coffeeShops) {
    return null;
  }

  const noCandidateData = [];
  const candidateData = [];
  const coreFactorIndex = [];
  const secondaryFactorIndex = [];
  const coreFactor = [];
  const secondaryFactor = [];

  const checkHasRating = (coffeeShops) => {
    coffeeShops.forEach((coffeeShop) => {
      coffeeShop.feedback
        ? candidateData.push(coffeeShop)
        : noCandidateData.push(coffeeShop);
    });
  };

  checkHasRating(coffeeShops);

  preference.forEach((value, index) => {
    value >= 4 ? coreFactorIndex.push(index) : secondaryFactorIndex.push(index);
  });

  const avgCoffeeShopRating = (feedback) => {
    const rating = [];
    for (let key in feedback) {
      rating.push(feedback[key].rating);
    };

    return rating.reduce((prev, curr) => [
      (prev[0] + curr[0]) / rating.length,
      (prev[1] + curr[1]) / rating.length,
      (prev[2] + curr[2]) / rating.length,
    ]);
  };

  const searchPriceRange = (averagePrice) => {
    if (averagePrice < 10000) return 1;
    else if (averagePrice >= 10000 && averagePrice < 30000) return 2;
    else if (averagePrice >= 30000 && averagePrice <= 50000) return 3;
    else return 4;
  };

  const candidateValue = candidateData.map((candidate) => {
    const priceRange = searchPriceRange(candidate.averagePrice);
    const avgRating = avgCoffeeShopRating(candidate.feedback);
    return [...avgRating, priceRange];
  });

  const gap = candidateValue.map((arr) =>
    arr.map((num, index) => num - preference[index])
  );

  const weighting = gap.map((arr) => {
    let temp = arr.map((value) => {
      switch (value) {
        case 0:
          return 5;
        case 1:
          return 4.5;
        case -1:
          return 4;
        case 2:
          return 3.5;
        case -2:
          return 3;
        case 3:
          return 2.5;
        case -3:
          return 2;
        case 4:
          return 1.5;
        case -4:
          return 1;
        default:
          return 0;
      }
    });
    return temp;
  });

  const average = (arr) => {
    return (
      arr.reduce((accumulator, currentValue) => accumulator + currentValue) /
      arr.length
    );
  };

  weighting.forEach((arr) => {
    let coreFactorTemp = [];
    let secondaryFactorTemp = [];
    arr.forEach((num, index) => {
      coreFactorIndex.includes(index)
        ? coreFactorTemp.push(num)
        : secondaryFactorTemp.push(num);
    });
    if (coreFactorTemp.length) coreFactor.push(average(coreFactorTemp));
    if (secondaryFactorTemp.length)
      secondaryFactor.push(average(secondaryFactorTemp));
  });

  const total = [];
  for (let index in candidateData) {
    let result = 0;
    if (coreFactor.length && secondaryFactor.length) {
      result = coreFactor[index] * 0.6 + secondaryFactor[index] * 0.4;
    } else if (coreFactor.length) {
      result = coreFactor[index];
    } else if (secondaryFactor.length) {
      result = secondaryFactor[index];
    }
    total.push(result);
  }

  const injectIndex = total.map((num, index) => [index, num]);
  const sortByValue = injectIndex.sort((a, b) => a[1] - b[1]).reverse();
  const sortedCandidateData = sortByValue.map((value) => {
    return { ...candidateData[value[0]], profileMatching: value[1].toFixed(1) };
  });
  const resultProfileMatching = [...sortedCandidateData, ...noCandidateData];

  // DEBUG
  // console.log("preference", preference);
  // console.log("candidateData", candidateData);
  // console.log("candidateValue", candidateValue);
  // console.log("coreFactorIndex", coreFactorIndex);
  // console.log("secondaryFactorIndex", secondaryFactorIndex);
  // console.log("gap", gap);
  // console.log("weighting", weighting);
  // console.log("coreFactor", coreFactor);
  // console.log("secondaryFactor", secondaryFactor);
  // console.log("total", total);
  // console.log("injectIndex", injectIndex);
  // console.log("sortByValue", sortByValue);
  // console.log("sortedCandidateData", sortedCandidateData);

  return resultProfileMatching;
};

export default profileMatching;
