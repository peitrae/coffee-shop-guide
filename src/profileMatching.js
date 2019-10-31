const profileMatching = (targetValue, candidateData) => {
  if (targetValue && candidateData) {
    const coreFactorIndex = [];
    const secondaryFactorIndex = [];

    targetValue.forEach(value => {
      if (value >= 4) {
        coreFactorIndex.push(targetValue.indexOf(value));
      } else {
        secondaryFactorIndex.push(targetValue.indexOf(value));
      }
    });

    const candidateValue = candidateData.map(num => num.rating.value);

    const gap = candidateValue.map(arr => arr.map((num, index) => num - targetValue[index]));

    const weighting = gap.map(arr => {
      let temp = arr.map(childArr => {
        switch (childArr) {
          case 0:
            childArr = 5;
            break;
          case 1:
            childArr = 4.5;
            break;
          case -1:
            childArr = 4;
            break;
          case 2:
            childArr = 3.5;
            break;
          case -2:
            childArr = 3;
            break;
          case 3:
            childArr = 2.5;
            break;
          case -3:
            childArr = 2;
            break;
          case 4:
            childArr = 1.5;
            break;
          case -4:
            childArr = 1;
            break;
          default:
            break;
        }
        return childArr;
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
        console.log("coreFactor & secondaryFactor")
        result = coreFactor[index] * 0.6 + secondaryFactor[index] * 0.4;
      } else if (coreFactor.length) {
        console.log("only coreFactor")
        result = coreFactor[index];
      } else if (secondaryFactor.length) {
        console.log("only secondaryFactor")
        result = secondaryFactor[index];
      }
      total.push(result);
    }

    const injectIndex = total.map((num, index) => [index, num]);
    const sortByValue = injectIndex.sort((a, b) => a[1] - b[1]).reverse();
    const sortCandidateData = sortByValue.map(value => candidateData[value[0]]);

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

    return sortCandidateData;
  }
};

export default profileMatching;
