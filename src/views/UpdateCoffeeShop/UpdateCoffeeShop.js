import React, { useState, useCallback, useEffect, createContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "./Header/Header";
import Information from "./Information/Information";
import Images from "./Images/Images";
import { Button } from "../../components/UI/Button/Button";
import HeaderPict from "../../assets/Header.png";
import Spinner from "../../components/UI/Spinner/Spinner";
import Footer from "../../components/UI/Footer/Footer";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import geocode from "../../utilities/geocode";
import uploadImage from "../../store/firebase/uploadImage";
import * as actions from "../../store/actions";

import "./UpdateCoffeeShop.scss";

export const FunctionContext = createContext();

const UpdateData = (props) => {
  const dispatch = useDispatch();

  const coffeeShopId = props.match.params.id || null;
  const userLocalId = useSelector((state) => state.member.localId);
  const oldCoffeeShop = useSelector((state) => state.coffeeShop.data);

  const [coffeeShop, setCoffeeShop] = useState({
    header: HeaderPict,
    name: null,
    address: null,
    averagePrice: 0,
    contact: null,
    facilities: [],
    operationalHours: [{}],
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
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState({
    name: false,
    address: false,
    timepicker: false,
  });

  useEffect(() => {
    if (coffeeShopId) {
      dispatch(actions.getCoffeeShopData(coffeeShopId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coffeeShopId]);

  useEffect(() => {
    if (coffeeShopId && oldCoffeeShop) {
      setCoffeeShop({ ...coffeeShop, ...oldCoffeeShop });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coffeeShopId, oldCoffeeShop]);

  const onHeaderChange = (e) => {
    const header = e.target.files[0];
    const reference = "coffeeShop/images/" + name;
    setUploading(true);

    uploadImage(header, reference)
      .then((response) => {
        setCoffeeShop({ ...coffeeShop, header: response });
        setUploading(false);
      })
      .catch((error) => console.log(error));

    let reader = new FileReader();
    reader.onloadend = () => {
      setHeaderPreview(reader.result);
    };
    reader.readAsDataURL(header);
  };

  const onChangeName = (e) => {
    setCoffeeShop({ ...coffeeShop, name: e.target.value });

    if (error && !name) {
      onError({ name: false });
    }
  };

  const onChangeAddress = (e) => {
    setCoffeeShop({ ...coffeeShop, address: e.target.value });

    if (error.address) {
      onError({ address: false });
    }
  };

  const onChangeInput = useCallback(
    (type) => (e) => {
      setCoffeeShop({ ...coffeeShop, [type]: e.target.value });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [averagePrice, contact]
  );

  const onSubmitFacility = (facility) => {
    const temp = [...facilities];
    temp.push(facility);
    setCoffeeShop({ ...coffeeShop, facilities: temp });
  };

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

  const onChangeDay = (e, day, index) => {
    e.preventDefault();

    let temp = [...operationalHours];
    temp[index] = { ...temp[index], day: parseInt(day) };
    temp = temp.sort((a, b) => a.day - b.day);

    setCoffeeShop({ ...coffeeShop, operationalHours: temp });
  };

  const onSubmitOpen = (open, index) => {
    let temp = [...operationalHours];
    temp[index].open = open;

    setCoffeeShop({ ...coffeeShop, operationalHours: temp });
  };

  const onSubmitClose = (close, index) => {
    let temp = [...operationalHours];
    temp[index].close = close;

    setCoffeeShop({ ...coffeeShop, operationalHours: temp });
  };

  const onAddDays = (e) => {
    e.preventDefault();
    const temp = [...operationalHours];
    temp.push({});
    setCoffeeShop({ ...coffeeShop, operationalHours: temp });
  };

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

  const onSetImage = useCallback(
    (images) => {
      setCoffeeShop({ ...coffeeShop, images: images });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [images]
  );

  const onError = (message) => {
    setError({ ...error, ...message });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formValidation = async (coffeeShop) => {
      if (!coffeeShop.name) {
        return {
          error: { name: "Coffee Shop's name is empty" },
        };
      } // Show error if name is empty

      if (!coffeeShop.address) {
        return {
          error: { address: "Coffee Shop's address is empty" },
        };
      } // Show error if address is empty

      for (let key in coffeeShop) {
        if (!coffeeShop[key]?.length || !coffeeShop[key]) {
          delete coffeeShop[key];
        }
      } // Delete unused property in coffeeshop

      try {
        // Populate coffeeshop with location
        const location = await geocode(coffeeShop.address);

        return { ...coffeeShop, location };
      } catch (err) {
        return {
          error: { address: err },
        };
      }
    };

    const validated = await formValidation(coffeeShop);

    if (validated.error) {
      onError(validated.error);
    } else {
      dispatch(
        actions.setCoffeeShopData(coffeeShop, coffeeShopId, props.history)
      );
    }
  };

  const editCoffeeShopNotReady = coffeeShopId && !oldCoffeeShop;
  const addCoffeeShopNotReady = !userLocalId;

  if (editCoffeeShopNotReady || addCoffeeShopNotReady) {
    return <Spinner />;
  }

  const checkError = () => {
    return error.name || error.address || error.timepicker;
  };

  const functionContextValue = {
    onHeaderChange,
    onChangeName,
    onChangeAddress,
    onChangeInput,
    onSubmitFacility,
    onDeleteFacility,
    onChangeDay,
    onSubmitOpen,
    onSubmitClose,
    onAddDays,
    onDeleteDay,
    onSetImage,
    setUploading,
    onError,
  };

  return (
    <FunctionContext.Provider value={functionContextValue}>
      <div className="update-coffeeshop">
        <div className="update-coffeeshop-container">
          <form>
            <Header header={headerPreview} name={name} address={address} />
            <Information
              averagePrice={averagePrice}
              contact={contact}
              facilities={facilities}
              operationalHours={operationalHours}
            />
            <Images images={images} coffeeShopName={coffeeShop.name} />
            {checkError() && <ErrorMessage>{checkError()}</ErrorMessage>}
            <Button
              size="lg"
              className="submit-button"
              onClick={submitHandler}
              disabled={uploading || checkError()}
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
