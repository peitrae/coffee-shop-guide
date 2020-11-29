import React, { useState, useCallback, useEffect, createContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "./Header/Header";
import Information from "./Information/Information";
import Images from "./Images/Images";
import { Button } from "../../components/UI/Button/Button";
import HeaderPict from "../../assets/Header.png";
import * as actions from "../../store/actions";
import Spinner from "../../components/UI/Spinner/Spinner";
import Footer from "../../components/UI/Footer/Footer";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import geocode from "../../utilities/geocode";

import "./UpdateCoffeeShop.scss";

export const FunctionContext = createContext();

const UpdateData = (props) => {
  const dispatch = useDispatch();

  const coffeeShopId = props.match.params.id || null;
  const userLocalId = useSelector((state) => state.member.localId);
  const oldCoffeeShop = useSelector((state) => state.coffeeShop.data);

  const [coffeeShop, setCoffeeShop] = useState({
    header: HeaderPict,
    name: "",
    address: "",
    averagePrice: 0,
    contact: "",
    facilities: [""],
    operationalHours: [
      {
        close: "00:00",
        day: "",
        open: "00:00",
      },
    ],
    images: [],
    uploadedBy: userLocalId,
  });

  const {
    header,
    name,
    address,
    averagePrice,
    contact,
    facilities,
    operationalHours,
    images,
  } = coffeeShop;

  const [headerPreview, setHeaderPreview] = useState(header);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (coffeeShopId) {
      dispatch(actions.getCoffeeShopData(coffeeShopId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coffeeShopId]);

  useEffect(() => {
    if (coffeeShopId && oldCoffeeShop) {
      setCoffeeShop(oldCoffeeShop);
    }
  }, [coffeeShopId, oldCoffeeShop]);

  const headerChangeHandler = useCallback(
    (e) => {
      setCoffeeShop({ ...coffeeShop, header: e.target.files[0] });
      let reader = new FileReader();
      reader.onloadend = () => {
        setHeaderPreview(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [header]
  );

  const onInputChange = useCallback(
    (type) => (e) => {
      setCoffeeShop({ ...coffeeShop, [type]: e.target.value });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [name, address, averagePrice, contact]
  );

  const onSubmitFacility = useCallback(
    (facility) => {
      const temp = [...facilities];
      temp.push(facility);
      setCoffeeShop({ ...coffeeShop, facilities: temp });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [facilities]
  );

  const onDeleteFacility = useCallback(
    (index) => (e) => {
      e.preventDefault();
      const temp = [...facilities];
      temp.splice(index, 1);
      setCoffeeShop({ ...coffeeShop, facilities: temp });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [facilities]
  );

  const onChangeDay = useCallback(
    (index) => (e) => {
      let temp = [...operationalHours];
      temp[index].day = e.target.value;
      temp = temp.sort((a, b) => a.day - b.day);
      setCoffeeShop({ ...coffeeShop, operationalHours: temp });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [operationalHours]
  );

  const onChangeTime = useCallback(
    (index, type) => (e) => {
      const temp = [...operationalHours];
      let toStringHours = e.getHours().toString();
      let toStringMinutes = e.getMinutes().toString();

      if (toStringHours.length === 1) toStringHours = `0${toStringHours}`;
      if (toStringMinutes.length === 1) toStringMinutes = `0${toStringMinutes}`;

      temp[index][type] = `${toStringHours}:${toStringMinutes}`;
      setCoffeeShop({ ...coffeeShop, operationalHours: temp });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [operationalHours]
  );

  const onAddDays = useCallback(
    (e) => {
      e.preventDefault();
      const temp = [...operationalHours];
      temp.push({
        close: "00:00",
        day: "",
        open: "00:00",
      });
      setCoffeeShop({ ...coffeeShop, operationalHours: temp });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [operationalHours]
  );

  const onDeleteDay = useCallback(
    (index) => (e) => {
      e.preventDefault();
      const temp = [...operationalHours];
      temp.splice(index, 1);
      setCoffeeShop({ ...coffeeShop, operationalHours: temp });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [operationalHours]
  );

  const setImage = (images) => setCoffeeShop({ ...coffeeShop, images: images });

  const submitValidation = (coffeeShop) => {
    if (!name.length) {
      return {
        error: "Coffee Shop's name is empty",
      };
    }

    if (!address.length) {
      return {
        error: "Coffee Shop's address is empty",
      };
    }

    coffeeShop.operationalHours = operationalHours.filter((item) => {
      return item.day !== "";
    });

    for (let key in coffeeShop) {
      const IsEmptyArray = !coffeeShop[key].length;
      const IsInvalidArray =
        Array.isArray(coffeeShop[key]) && coffeeShop[key][0] === "";

      if (
        key !== "name" &&
        key !== "address" &&
        (IsEmptyArray || IsInvalidArray)
      ) {
        delete coffeeShop[key];
      }
    }

    return coffeeShop;
  };

  const populateLocation = async (coffeeShop) => {
    console.log("Address", address);
    const location = await geocode(address);

    console.log("Location", location);
    return { ...coffeeShop, location };
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const validated = submitValidation(coffeeShop);

    if (validated.error) {
      setError(validated.error);
    } else {
      const coffeeShop = await populateLocation(validated);

      dispatch(
        actions.setCoffeeShopData(
          { ...oldCoffeeShop, ...coffeeShop },
          coffeeShopId,
          props.history
        )
      );
    }
  };

  const editCoffeeShopNotReady = coffeeShopId && !oldCoffeeShop;
  const addCoffeeShopNotReady = !userLocalId;

  if (editCoffeeShopNotReady || addCoffeeShopNotReady) {
    return <Spinner />;
  }

  const functionContextValue = {
    onInputChange,
    onSubmitFacility,
    onDeleteFacility,
    onChangeDay,
    onChangeTime,
    onAddDays,
    onDeleteDay,
  };

  return (
    <FunctionContext.Provider value={functionContextValue}>
      <div className="update-coffeeshop">
        <div className="update-coffeeshop-container">
          <form>
            <Header
              header={headerPreview}
              name={name}
              address={address}
              headerChangeHandler={headerChangeHandler}
              inputChangeHandler={onInputChange}
            />
            <Information
              averagePrice={averagePrice}
              contact={contact}
              facilities={facilities}
              operationalHours={operationalHours}
            />
            <Images
              images={images}
              coffeeShopName={coffeeShop.name}
              setImage={setImage}
              setIsUploading={setIsUploading}
              coffeeShopId={coffeeShopId}
            />
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Button
              size="lg"
              className="submit-button"
              onClick={submitHandler}
              disabled={isUploading}
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
      <Footer />
    </FunctionContext.Provider>
  );
};

export default UpdateData;
