import { getDistance } from "geolib";

const profileMatching = (preference, userLocation, coffeeShops) => {
  if (!preference || !coffeeShops) {
    return null;
  }

  if (!coffeeShops.length) {
    return [];
  }

  const getAverage = (arr) => {
    return (
      arr.reduce((accumulator, currentValue) => accumulator + currentValue) /
      arr.length
    );
  };

  const getCandidateAspects = (coffeeShops) => {
    const getPriceRange = (averagePrice) => {
      if (averagePrice <= 10000) return 1;
      else if (averagePrice > 10000 && averagePrice <= 30000) return 2;
      else if (averagePrice > 30000 && averagePrice <= 50000) return 3;
      else return 4;
    };

    const getDistanceGroup = (distance) => {
      if (distance > 10000) {
        return 5;
      } else if (distance > 5000) {
        return 4;
      } else if (distance > 3000) {
        return 3;
      } else if (distance > 1000) {
        return 2;
      } else if (distance > 0) {
        return 1;
      } else {
        return 0;
      }
    };

    const getTastesAndCoffeePresentations = (reviews) => {
      const tastes = [];
      const coffeePresentation = [];

      Object.keys(reviews).forEach((key) => {
        tastes.push(reviews[key].rating[0]);
        coffeePresentation.push(reviews[key].rating[1]);
      });

      return { tastes, coffeePresentation };
    };

    const candidateData = coffeeShops.map((coffeeShop) => {
      const distance = getDistance(
        { latitude: userLocation.lat, longitude: userLocation.long },
        {
          latitude: coffeeShop.location.lat,
          longitude: coffeeShop.location.long,
        }
      );

      const { tastes, coffeePresentation } = getTastesAndCoffeePresentations(
        coffeeShop.reviews
      );

      return {
        id: coffeeShop.id,
        distance: getDistanceGroup(distance),
        averagePrice: getPriceRange(coffeeShop.averagePrice),
        taste: getAverage(tastes),
        coffeePresentation: getAverage(coffeePresentation),
        data: { ...coffeeShop },
      };
    });

    return candidateData;
  };

  const getGap = (candidates) => {
    return candidates.map((candidate) => {
      // console.log(candidate.taste, expectedValue[2], candidate.taste - expectedValue[2]);

      return {
        id: candidate.id,
        distance: candidate.distance - expectedValue[0],
        averagePrice: candidate.averagePrice - expectedValue[1],
        taste: Math.floor(candidate.taste - expectedValue[2]),
        coffeePresentation: Math.floor(
          candidate.coffeePresentation - expectedValue[3]
        ),
        data: candidate.data,
      };
    });
  };

  const getWeighting = (gap) => {
    const getWeightingItem = (value) => {
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
    };

    return gap.map((candidate) => ({
      id: candidate.id,
      distance: getWeightingItem(candidate.distance),
      averagePrice: getWeightingItem(candidate.averagePrice),
      taste: getWeightingItem(candidate.taste),
      coffeePresentation: getWeightingItem(candidate.coffeePresentation),
      data: candidate.data,
    }));
  };

  const getProfileMatching = (weighting) => {
    return weighting.map((candidate) => {
      const coreFactor = getAverage([
        candidate.distance,
        candidate.averagePrice,
      ]);
      const secondaryFactor = getAverage([
        candidate.taste,
        candidate.coffeePresentation,
      ]);

      const profileMatching = coreFactor * 0.6 + secondaryFactor * 0.4;

      return {
        ...candidate.data,
        id: candidate.id,
        profileMatching,
      };
    });
  };

  const expectedValue = [...preference];
  const candidates = [];
  const notCandidates = [];

  coffeeShops.forEach((coffeeShop) => {
    if (coffeeShop.reviews) {
      candidates.push(coffeeShop);
    } else {
      notCandidates.push(coffeeShop);
    }
  });

  const candidateAspects = getCandidateAspects(candidates);
  const gap = getGap(candidateAspects);
  const weighting = getWeighting(gap);
  const result = getProfileMatching(weighting);
  const sortedResult = result
    .sort((a, b) => a.profileMatching - b.profileMatching)
    .reverse();

  // DEBUG

  // console.log("preference", preference)
  // console.log("expectedValue", expectedValue);
  // console.log("candidates", candidates);
  // console.log("candidateAspects: ", { name: candidateAspects.data.name, distance: candidateAspects.distance,  averagePrice: candidateAspects.averagePrice, taste});
  // console.log("candidateAspects", candidateAspects);
  // console.log("gap", gap);
  // console.log("weighting", weighting);
  // console.log("result", result);
  // console.log("sortedResult", sortedResult);

  return [...sortedResult, ...notCandidates];
};

export default profileMatching;
