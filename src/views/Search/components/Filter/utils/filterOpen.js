const filterOpen = (coffeeShops) => {
  return coffeeShops.filter(({ operationalHours }) => {
    if (!operationalHours) {
      return false;
    }

    const date = new Date();
    const todayDay = date.getDay();
    const todayHours = date.getHours();
    const todayMinutes = date.getMinutes();

    const todayOperational = operationalHours.find(
      ({ day }) => todayDay === day
    );

    if (!todayOperational) {
      return false;
    }

    const { day, open, close } = todayOperational;
    const openingHours = parseInt(open.slice(0, 2));
    const openingMinutes = parseInt(open.slice(4));
    let closingHours = parseInt(close.slice(0, 2));
    let closingMinutes = parseInt(close.slice(4));

    if (closingHours === 0) {
      closingHours = 24;
    }
    if (closingMinutes === 0) {
      closingMinutes = 60;
    }

    const checkDay = day === todayDay;
    const checkHours = todayHours >= openingHours && todayHours <= closingHours;
    const checkMinutes =
      todayMinutes >= openingMinutes && todayMinutes <= closingMinutes;

    return checkDay && checkHours && checkMinutes;
  });
};

export default filterOpen;
