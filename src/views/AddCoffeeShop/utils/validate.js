import geocode from "../../../utils/geocode";

const validate = async (coffeeShop) => {
  console.log(coffeeShop.address);

  if (!coffeeShop.name) {
    return {
      validationError: { name: "Coffee Shop's name is empty" },
    };
  } // Show error if name is empty

  if (!coffeeShop.address) {
    return {
      validationError: { address: "Coffee Shop's address is empty" },
    };
  } // Show error if address is empty

  try {
    const location = await geocode(coffeeShop.address);
    // Populate coffeeshop with location

    return { validatedCoffeeShop: { ...coffeeShop, location } };
  } catch (err) {
    return {
      validationError: {
        address: "Location information is unavalaible. Check your address",
      },
    };
  }
};

export default validate;
