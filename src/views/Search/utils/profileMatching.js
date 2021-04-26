const profileMatching = (preference, coffeeShops) => {
	if (!preference || !coffeeShops) {
		return null;
	}

	if (!coffeeShops.length) {
		return [];
	}

	const getCandidateAspects = (coffeeShops) => {
		const getPriceRange = (averagePrice) => {
			if (averagePrice >= 3000 && averagePrice <= 18000) return 1;
			else if (averagePrice > 18000 && averagePrice <= 33000) return 2;
			else if (averagePrice > 33000 && averagePrice <= 48000) return 3;
			else if (averagePrice > 48000) return 4;
		};

		const getAspects = (feedback) => {
			const location = [];
			const service = [];
			const ambience = [];

			Object.keys(feedback).forEach((user) => {
				location.push(feedback[user].rating.location);
				service.push(feedback[user].rating.service);
				ambience.push(feedback[user].rating.ambience);
			});

			return {
				location,
				service,
				ambience,
			};
		};

		const getLocationAvg = (location) => {
			return location.reduce((accumulator, currentValue) => ({
				accessibility:
					(accumulator.accessibility + currentValue.accessibility) /
					location.length,
				comfortability:
					(accumulator.comfortability + currentValue.comfortability) /
					location.length,
				parking: (accumulator.parking + currentValue.parking) / location.length,
				traffic: (accumulator.traffic + currentValue.traffic) / location.length,
			}));
		};

		const getServiceAvg = (service) => {
			return service.reduce((accumulator, currentValue) => ({
				attentiveness:
					(accumulator.attentiveness + currentValue.attentiveness) /
					service.length,
				friendliness:
					(accumulator.friendliness + currentValue.friendliness) /
					service.length,
				promotion:
					(accumulator.promotion + currentValue.promotion) / service.length,
				responsiveness:
					(accumulator.responsiveness + currentValue.responsiveness) /
					service.length,
			}));
		};

		const getAmbienceAvg = (ambience) => {
			return ambience.reduce((accumulator, currentValue) => ({
				cleanliness:
					(accumulator.cleanliness + currentValue.cleanliness) /
					ambience.length,
				design: (accumulator.design + currentValue.design) / ambience.length,
				lightning:
					(accumulator.lightning + currentValue.lightning) / ambience.length,
				music: (accumulator.music + currentValue.music) / ambience.length,
				temperature:
					(accumulator.temperature + currentValue.temperature) /
					ambience.length,
			}));
		};

		const candidateData = coffeeShops.map((coffeeShop) => {
			const { location, service, ambience } = getAspects(coffeeShop.feedback);

			return {
				id: coffeeShop.id,
				averagePrice: getPriceRange(coffeeShop.averagePrice),
				location: getLocationAvg(location),
				service: getServiceAvg(service),
				ambience: getAmbienceAvg(ambience),
				data: { ...coffeeShop },
			};
		});

		return candidateData;
	};

	const getGap = (target, candidates) => {
		return candidates.map((candidate) => ({
			id: candidate.id,
			averagePrice: candidate.averagePrice - target.price,
			location: {
				accessibility: Math.floor(
					candidate.location.accessibility - target.location.accessibility
				),
				comfortability: Math.floor(
					candidate.location.comfortability - target.location.comfortability
				),
				parking: Math.floor(
					candidate.location.parking - target.location.parking
				),
				traffic: Math.floor(
					candidate.location.traffic - target.location.traffic
				),
			},
			service: {
				attentiveness: Math.floor(
					candidate.service.attentiveness - target.service.attentiveness
				),
				friendliness: Math.floor(
					candidate.service.friendliness - target.service.friendliness
				),
				promotion: Math.floor(
					candidate.service.promotion - target.service.promotion
				),
				responsiveness: Math.floor(
					candidate.service.responsiveness - target.service.responsiveness
				),
			},
			ambience: {
				cleanliness: Math.floor(
					candidate.ambience.cleanliness - target.ambience.cleanliness
				),
				design: Math.floor(candidate.ambience.design - target.ambience.design),
				lightning: Math.floor(
					candidate.ambience.lightning - target.ambience.lightning
				),
				music: Math.floor(candidate.ambience.music - target.ambience.music),
				temperature: Math.floor(
					candidate.ambience.temperature - target.ambience.temperature
				),
			},
			data: candidate.data,
		}));
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
			averagePrice: getWeightingItem(candidate.averagePrice),
			location: {
				accessibility: getWeightingItem(candidate.location.accessibility),
				comfortability: getWeightingItem(candidate.location.comfortability),
				parking: getWeightingItem(candidate.location.parking),
				traffic: getWeightingItem(candidate.location.traffic),
			},
			service: {
				attentiveness: getWeightingItem(candidate.service.attentiveness),
				friendliness: getWeightingItem(candidate.service.friendliness),
				promotion: getWeightingItem(candidate.service.promotion),
				responsiveness: getWeightingItem(candidate.service.responsiveness),
			},
			ambience: {
				cleanliness: getWeightingItem(candidate.ambience.cleanliness),
				design: getWeightingItem(candidate.ambience.design),
				lightning: getWeightingItem(candidate.ambience.lightning),
				music: getWeightingItem(candidate.ambience.music),
				temperature: getWeightingItem(candidate.ambience.temperature),
			},
			data: candidate.data,
		}));
	};

	const getProfileMatching = (weighting) => {
		const getAverage = (arr) => {
			return (
				arr.reduce((accumulator, currentValue) => accumulator + currentValue) /
				arr.length
			);
		};

		return weighting.map((candidate) => {
			const coreFactor = getAverage([
				candidate.ambience.cleanliness,
				candidate.ambience.design,
				candidate.ambience.lightning,
				candidate.ambience.music,
				candidate.ambience.temperature,
				candidate.service.attentiveness,
				candidate.service.friendliness,
				candidate.service.promotion,
				candidate.service.responsiveness,
			]);
			const secondaryFactor = getAverage([
				candidate.averagePrice,
				candidate.location.accessibility,
				candidate.location.comfortability,
				candidate.location.parking,
				candidate.location.traffic,
			]);

			const profileMatching = coreFactor * 0.6 + secondaryFactor * 0.4;

			return {
				...candidate.data,
				id: candidate.id,
				profileMatching,
			};
		});
	};

	const candidates = [];
	const notCandidates = [];

	coffeeShops.forEach((coffeeShop) => {
		if (coffeeShop.feedback && coffeeShop.averagePrice) {
			candidates.push(coffeeShop);
		} else {
			notCandidates.push(coffeeShop);
		}
	});

	const candidateAspects = getCandidateAspects(candidates);
	const gap = getGap(preference, candidateAspects);
	const weighting = getWeighting(gap);
	const result = getProfileMatching(weighting);
	const sortedResult = result
		.sort((a, b) => a.profileMatching - b.profileMatching)
		.reverse();

	// // DEBUG

	console.log('preference', preference);
	console.log('coffeeShops', coffeeShops);
	console.log('candidateAspects', candidateAspects);
	console.log('gap', gap);
	console.log('weighting', weighting);
	console.log('result', result);
	console.log("sortedResult", sortedResult);

	return [...sortedResult, ...notCandidates];
};

export default profileMatching;
