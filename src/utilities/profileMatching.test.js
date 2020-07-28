const testing = false;
const path = []

const profileMatching = (preference, coffeeShopList) => {
  if (preference && coffeeShopList) {
    testing && path.push('1');

    const noCandidateData = [];
    const candidateData = [];
    const coreFactorIndex = [];
    const secondaryFactorIndex = [];
    const coreFactor = [];
    const secondaryFactor = [];

    testing && path.push('2');

    const checkHasRating = (coffeeShopList) => {
      coffeeShopList.forEach((coffeeShop, index) => {
        if (index === 0) {
          testing && path.push('3');
        }
        if (index < coffeeShopList.length) {
          testing && path.push('4');
        }

        testing && path.push('6');
        if (coffeeShop.rating) {
          testing && path.push('7');
          candidateData.push(coffeeShop);
        } else {
          // If there's a coffee shop without have the rating
          testing && path.push('8');
          noCandidateData.push(coffeeShop);
        }

        testing && path.push('5');
      });
    };

    checkHasRating(coffeeShopList);

    preference.forEach((value, index) => {
      if (index === 0) {
        testing && path.push('9');
      }
      if (index < coffeeShopList.length) {
        testing && path.push('10');
      }

      testing && path.push('12');
      if (value >= 4) {
        testing && path.push('13');
        coreFactorIndex.push(index);
      } else {
        testing && path.push('14');
        secondaryFactorIndex.push(index);
      }

      testing && path.push('11');
    });

    const avgCoffeeShopRating = (rating) => {
      testing && path.push('27');
      const ratingArr = [];
      for (let key in rating) ratingArr.push(rating[key]);

      return ratingArr.reduce((prev, curr) => [
        (prev[0] + curr[0]) / ratingArr.length,
        (prev[1] + curr[1]) / ratingArr.length,
        (prev[2] + curr[2]) / ratingArr.length,
      ]);
    };

    const searchPriceRange = (averagePrice) => {
      testing && path.push('20');
      if (averagePrice < 10000) {
        testing && path.push('21');
        return 1;
      } else if (averagePrice >= 10000 && averagePrice < 30000) {
        testing && path.push('22');
        testing && path.push('23');
        return 2;
      } else if (averagePrice >= 30000 && averagePrice <= 50000) {
        testing && path.push('22');
        testing && path.push('24');
        testing && path.push('25');
        return 3;
      } else {
        testing && path.push('22');
        testing && path.push('24');
        testing && path.push('26');
        return 4;
      }
    };

    testing && path.push('15');
    const candidateValue = candidateData.map((candidate, index) => {
      if (index === 0) {
        testing && path.push('16');
      }
      if (index < candidateData.length) {
        testing && path.push('17');
      }

      testing && path.push('19');
      const priceRange = searchPriceRange(candidate.averagePrice);
      const avgRating = avgCoffeeShopRating(candidate.rating);

      testing && path.push('28');
      testing && path.push('18');
      return [...avgRating, priceRange];
    });

    testing && path.push('29');
    const gap = candidateValue.map((arr, index) => {
      if (index === 0) {
        testing && path.push('30');
      }
      if (index < candidateValue.length) {
        testing && path.push('31');
      }

      testing && path.push('33');
      const temp = arr.map((num, index) => {
        if (index === 0) {
          testing && path.push('34');
        }
        if (index < arr.length) {
          testing && path.push('35');
        }

        const temp = num - preference[index];
        testing && path.push('37');

        testing && path.push('36');
        return temp;
      });

      testing && path.push('38');

      testing && path.push('32');
      return temp;
    });

    testing && path.push('39');
    const weighting = gap.map((arr, index) => {
      if (index === 0) {
        testing && path.push('40');
      }
      if (index < gap.length) {
        testing && path.push('41');
      }

      testing && path.push('43');
      let temp = arr.map((value, index) => {
        if (index === 0) {
          testing && path.push('44');
        }
        if (index < arr.length) {
          testing && path.push('45');
        }

        testing && path.push('47');
        switch (value) {
          case 0: {
            testing && path.push('48');
            testing && path.push('46');
            return 5;
          }

          case 1: {
            testing && path.push('49');
            testing && path.push('46');
            return 4.5;
          }
          case -1: {
            testing && path.push('50');
            testing && path.push('46');
            return 4;
          }
          case 2: {
            testing && path.push('51');
            testing && path.push('46');
            return 3.5;
          }
          case -2: {
            testing && path.push('52');
            testing && path.push('46');
            return 3;
          }
          case 3: {
            testing && path.push('53');
            testing && path.push('46');
            return 2.5;
          }
          case -3: {
            testing && path.push('54');
            testing && path.push('46');
            return 2;
          }
          case 4: {
            testing && path.push('55');
            testing && path.push('46');
            return 1.5;
          }
          case -4: {
            testing && path.push('56');
            testing && path.push('46');
            return 1;
          }
          default:
            break;
        }
      });
      testing && path.push('57');

      testing && path.push('42');
      return temp;
    });

    const average = (arr) => {
      return (
        arr.reduce((accumulator, currentValue) => accumulator + currentValue) /
        arr.length
      );
    };

    weighting.forEach((arr, index) => {
      if (index === 0) {
        testing && path.push('58');
      }
      if (index < weighting.length) {
        testing && path.push('59');
      }

      let coreFactorTemp = [];
      let secondaryFactorTemp = [];
      path.push('61');

      arr.forEach((num, index) => {
        if (index === 0) {
          testing && path.push('62');
        }
        if (index < arr.length) {
          testing && path.push('63');
        }

        testing && path.push('65');
        if (coreFactorIndex.includes(index)) {
          testing && path.push('66');
          coreFactorTemp.push(num);
        } else {
          testing && path.push('67');
          secondaryFactorTemp.push(num);
        }

        testing && path.push('64');
      });

      testing && path.push('68');
      if (coreFactorTemp.length) {
        testing && path.push('69');
        coreFactor.push(average(coreFactorTemp));
      }

      testing && path.push('70');
      if (secondaryFactorTemp.length) {
        secondaryFactor.push(average(secondaryFactorTemp));
        testing && path.push('71');
      }

      testing && path.push('60');
    });

    testing && path.push('72');
    const total = [];
    for (let index in candidateData) {
      if (index === 0) {
        console.log("MASUK")
        testing && path.push('73');
      }
      if (index < candidateData.length) {
        testing && path.push('74');
      }

      testing && path.push('76');
      let result = 0;

      testing && path.push('77');
      if (coreFactor.length && secondaryFactor.length) {
        testing && path.push('78');
        result = coreFactor[index] * 0.6 + secondaryFactor[index] * 0.4;
      } else if (coreFactor.length) {
        testing && path.push('79');
        testing && path.push('80');
        result = coreFactor[index];
      } else if (secondaryFactor.length) {
        testing && path.push('79');
        testing && path.push('81');
        testing && path.push('82');
        result = secondaryFactor[index];
      }

      testing && path.push('83');
      total.push(result);

      testing && path.push('75');
    }

    testing && path.push('84');
    const injectIndex = total.map((num, index) => {
      if (index === 0) {
        testing && path.push('85');
      }
      if (index < total.length) {
        testing && path.push('86');
      }

      testing && path.push('88');
      testing && path.push('87');
      return [index, num];
    });

    testing && path.push('89');
    const sortByValue = injectIndex.sort((a, b) => a[1] - b[1]).reverse();

    testing && path.push('90');
    const sortedCandidateData = sortByValue.map((value, index) => {
      if (index === 0) {
        testing && path.push('91');
      }
      if (index < sortByValue.length) {
        testing && path.push('92');
      }

      testing && path.push('94');
      testing && path.push('93');
      return candidateData[value[0]];
    });

    testing && path.push('95');
    const resultProfileMatching = [...sortedCandidateData, ...noCandidateData];

    testing && path.push('96');
    // DEBUG
    // console.log("coffeeShopList", coffeeShopList)
    // console.log("preference", preference);
    // console.log("candidateData", candidateData);
    // console.log("candidateValue", candidateValue);
    // console.log("coreFactorIndex", coreFactorIndex);
    // console.log("secondaryFactorIndex", secondaryFactorIndex);
    // console.log("gap", gap);
    console.log("weighting", weighting);
    console.log("coreFactor", coreFactor);
    console.log("secondaryFactor", secondaryFactor);
    console.log("total", total);
    console.log("injectIndex", injectIndex);
    console.log("sortByValue", sortByValue);
    console.log("sortedCandidateData", sortedCandidateData);

    // testing && console.log("PATH", path.join('-'))
    
    return resultProfileMatching;
  }
};

export default profileMatching;
