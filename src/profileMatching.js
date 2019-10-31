const profileMatching = (targetValue, coffeeShopList) => {
  if (targetValue && coffeeShopList) {
    const defaultValue = 1000;
    const noCandidateData = [];
    const candidateData = [];
    const coreFactorIndex = [];
    const secondaryFactorIndex = [];

    const checkHasRating = coffeeShopList => {
      coffeeShopList.forEach(coffeeShop => {
        coffeeShop.rating
          ? candidateData.push(coffeeShop)
          : noCandidateData.push(coffeeShop);
      });
    };

    checkHasRating(coffeeShopList);

    targetValue.forEach(value => {
      value >= 4
        ? coreFactorIndex.push(targetValue.indexOf(value))
        : secondaryFactorIndex.push(targetValue.indexOf(value));
    });

    const avgCoffeeShopRating = rating => {
      const ratingArr = [];
      for (let key in rating) ratingArr.push(rating[key]);

      return ratingArr.reduce((prev, curr) => [
        (prev[0] + curr[0]) / ratingArr.length,
        (prev[1] + curr[1]) / ratingArr.length,
        (prev[2] + curr[2]) / ratingArr.length
      ]);
    };

    const searchPriceRange = averagePrice => {
      console.log(averagePrice);
      switch (averagePrice) {
        case averagePrice < 10000:
          return 1;
        case averagePrice >= 10000 && averagePrice < 30000:
          return 2;
        case averagePrice >= 30000 && averagePrice <= 50000:
          return 3;
        case averagePrice > 50000:
          return 4;
        default:
          return defaultValue;
      }
    };

    const candidateValue = candidateData.map(num => {
      const priceRange = searchPriceRange(num.averagePrice);
      console.log(priceRange);
      const avgRating = avgCoffeeShopRating(num.rating);
      return [...avgRating, priceRange];
    });

    const gap = candidateValue.map(arr =>
      arr.map((num, index) => num - targetValue[index])
    );

    const weighting = gap.map(arr => {
      let temp = arr.map(childArr => {
        switch (childArr) {
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
            break;
        }
      });
      return temp;
    });

    const average = arr => {
      return (
        arr.reduce((accumulator, currentValue) => accumulator + currentValue) /
        arr.length
      );
    };

    const coreFactor = [];
    const secondaryFactor = [];

    weighting.forEach(arr => {
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
        console.log("coreFactor & secondaryFactor");
        result = coreFactor[index] * 0.6 + secondaryFactor[index] * 0.4;
      } else if (coreFactor.length) {
        console.log("only coreFactor");
        result = coreFactor[index];
      } else if (secondaryFactor.length) {
        console.log("only secondaryFactor");
        result = secondaryFactor[index];
      }
      total.push(result);
    }

    const injectIndex = total.map((num, index) => [index, num]);
    const sortByValue = injectIndex.sort((a, b) => a[1] - b[1]).reverse();
    const sortCandidateData = sortByValue.map(value => candidateData[value[0]]);
    const resultProfileMatching = [...sortCandidateData, ...noCandidateData]

    // DEBUG
    // console.log("targetValue", targetValue);
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
    // console.log("sortCandidateData", sortCandidateData);

    return resultProfileMatching;
  }
};

export default profileMatching;
