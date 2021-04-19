import React, { useState, useEffect, createContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router";

import Navbar from "../../components/UI/Navbar";
import { Button } from "../../components/UI/Button";
import HeaderPict from "../../assets/Header.png";
import Spinner from "../../components/UI/Spinner";
import Footer from "../../components/UI/Footer";
import ErrorMessage from "../../components/ErrorMessage";
import Header from "./components/Header";
import Information from "./components/Information";
import Images from "./components/Images";
import uploadImage from "../../store/firebase/uploadImage";
import * as actions from "../../store/actions";
import validate from "./utils/validate";
import saveCoffeeShop from "../../utils/api/saveCoffeeShop";

export const FunctionContext = createContext();

const AddCoffeeShop = () => {
  const dispatch = useDispatch();
  const { id: coffeeShopId = null } = useParams();
  const history = useHistory();

  const userLocalId = useSelector(({ member }) => member.localId);
  const oldCoffeeShop = useSelector(({ coffeeShop }) => coffeeShop.data);

  const [coffeeShop, setCoffeeShop] = useState({
    header: HeaderPict,
    name: undefined,
    address: undefined,
    averagePrice: 0,
    contact: undefined,
    facilities: [],
    operationalHours: [],
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

  const [headerPreview, setHeaderPreview] = useState(null);
  const [headerUploading, setHeaderUploading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [error, setError] = useState({
    name: false,
    address: false,
    timepicker: false,
  });

  useEffect(() => {
    if (coffeeShopId) {
      dispatch(actions.getCoffeeShop(coffeeShopId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coffeeShopId]);

  useEffect(() => {
    if (coffeeShopId && oldCoffeeShop) {
      setCoffeeShop({ ...coffeeShop, ...oldCoffeeShop });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coffeeShopId, oldCoffeeShop]);

  const handleHeaderChange = (e) => {
    const header = e.target.files[0];
    const reference = `coffeeShop/images/${coffeeShopId}`;
    setHeaderUploading(true);

    uploadImage(header, reference)
      .then((response) => {
        setCoffeeShop({ ...coffeeShop, header: response });
        setHeaderUploading(false);
      })
      .catch((error) => console.log(error));

    let reader = new FileReader();
    reader.onloadend = () => {
      setHeaderPreview(reader.result);
    };
    reader.readAsDataURL(header);
  };

  const handleNameChange = (e) => {
    setCoffeeShop({ ...coffeeShop, name: e.target.value });

    if (error && !name) {
      handleError({ name: false });
    }
  };

  const handleAddressChange = (e) => {
    setCoffeeShop({ ...coffeeShop, address: e.target.value });

    if (error.address) {
      handleError({ address: false });
    }
  };

  const handleInputChange = (e) => {
    setCoffeeShop({ ...coffeeShop, [e.target.name]: e.target.value });
  };

  const handleSubmitFacilities = (facility) => {
    const temp = [...facilities];
    temp.push(facility);
    setCoffeeShop({ ...coffeeShop, facilities: temp });
  };

  const handleDeleteFacilities = (index) => (e) => {
    e.preventDefault();
    const temp = [...facilities];
    temp.splice(index, 1);
    setCoffeeShop({ ...coffeeShop, facilities: temp });
  };

  const handleDayChange = (e, day, index) => {
    e.preventDefault();

    let temp = [...operationalHours];
    temp[index] = { ...temp[index], day: parseInt(day) };
    temp = temp.sort((a, b) => a.day - b.day);

    setCoffeeShop({ ...coffeeShop, operationalHours: temp });
  };

  const handleSubmitOpen = (open, index) => {
    console.log(open, index)

    let temp = [...operationalHours];
    temp[index].open = open;

    setCoffeeShop({ ...coffeeShop, operationalHours: temp });
  };

  const handleSubmitClose = (close, index) => {
    let temp = [...operationalHours];
    temp[index].close = close;

    setCoffeeShop({ ...coffeeShop, operationalHours: temp });
  };

  const handleAddDays = (e) => {
    e.preventDefault();
    const temp = [...operationalHours];
    temp.push({});
    setCoffeeShop({ ...coffeeShop, operationalHours: temp });
  };

  const handleDayDelete = (index) => (e) => {
    e.preventDefault();
    const temp = [...operationalHours];
    temp.splice(index, 1);
    setCoffeeShop({ ...coffeeShop, operationalHours: temp });
  };

  const handleSetImages = (images) => {
    setCoffeeShop({ ...coffeeShop, images });
  };

  const handleError = (message) => {
    setError({ ...error, ...message });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { validatedCoffeeShop, validationError } = await validate(coffeeShop);

    if (validationError) {
      handleError(validationError);
    } else {
      const newCoffeeShopId = await saveCoffeeShop(
        coffeeShopId,
        validatedCoffeeShop
      );

      history.push(`/coffee-shop/${newCoffeeShopId}`);
      // actions.addCoffeeShop(validatedCoffeeShop, coffeeShopId, history)
    }
  };

  const functionContextValue = {
    handleHeaderChange,
    handleNameChange,
    handleAddressChange,
    handleInputChange,
    handleSubmitFacilities,
    handleDeleteFacilities,
    handleDayChange,
    handleSubmitOpen,
    handleSubmitClose,
    handleAddDays,
    handleDayDelete,
    handleSetImages,
    setImageUploading,
    handleError,
  };

  const isError = error.name || error.address || error.timepicker;
  const editCoffeeShopNotReady = coffeeShopId && !oldCoffeeShop;
  const addCoffeeShopNotReady = !userLocalId;

  if (editCoffeeShopNotReady || addCoffeeShopNotReady) {
    return <Spinner />;
  }

  return (
    <>
      <Navbar />
      <div className="add-coffeeshop">
        <div className="add-coffeeshop__container">
          <FunctionContext.Provider value={functionContextValue}>
            <form>
              <Header
                header={headerPreview || header}
                headerUploading={headerUploading}
                name={name}
                address={address}
              />
              <Information
                averagePrice={averagePrice}
                contact={contact}
                facilities={facilities}
                operationalHours={operationalHours}
              />
              <Images images={images} coffeeShopId={coffeeShopId} />
              {isError && (
                <ErrorMessage className="margin-b-8">{isError}</ErrorMessage>
              )}
              <Button
                size="lg"
                className="add-coffeeshop__btn-submit"
                onClick={handleSubmit}
                disabled={imageUploading || isError}
              >
                Submit
              </Button>
            </form>
          </FunctionContext.Provider>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddCoffeeShop;
