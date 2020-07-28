import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Header from './Header/Header';
import Information from './Information/Information';
import Images from './Images/Images';
import { BtnLarge } from '../../components/UI/Button/Button';
import HeaderPict from '../../assets/Header.png';
import classes from './UpdateCoffeeShop.module.css';
import * as actions from '../../store/actions';
import Spinner from '../../components/UI/Spinner/Spinner';
import Footer from '../../components/UI/Footer/Footer';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

const UpdateData = (props) => {
  const coffeeShopId = props.match.params.id || null;

  const userLocalId = useSelector((state) => state.member.localId);
  const coffeeShopData = useSelector((state) => state.coffeeShop.data);

  const dispatch = useDispatch();
  const setCoffeeShopData = (coffeeShopData, coffeeShopId, history) =>
    dispatch(actions.setCoffeeShopData(coffeeShopData, coffeeShopId, history));
  const getCoffeeShopData = useCallback(
    (coffeeShopId) => dispatch(actions.getCoffeeShopData(coffeeShopId)),
    [dispatch]
  );

  useEffect(() => {
    if (coffeeShopId) getCoffeeShopData(coffeeShopId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [coffeeShop, setCoffeeShop] = useState({
    header: HeaderPict,
    name: '',
    address: '',
    averagePrice: 0,
    contact: '',
    facilities: [''],
    rating: [],
    operationalHours: [
      {
        close: '00:00',
        day: '',
        open: '00:00',
      },
    ],
    images: [],
    uploadedBy: userLocalId,
  });
  const [readyToSubmit, setReadyToSubmit] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const editCoffeeShop = coffeeShopId && coffeeShopData;
    if (editCoffeeShop) setCoffeeShop(coffeeShopData);
  }, [coffeeShopId, coffeeShopData]);

  useEffect(() => {
    if (userLocalId) {
      setCoffeeShop({ ...coffeeShop, uploadedBy: userLocalId });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLocalId]);

  const editCoffeeShopNotReady = coffeeShopId && !coffeeShopData;
  const addCoffeeShopNotReady = !userLocalId;

  if (editCoffeeShopNotReady || addCoffeeShopNotReady) return <Spinner />;

  const setImage = (images) => setCoffeeShop({ ...coffeeShop, images: images });

  const submitValidation = (coffeeShop) => {
    if (!coffeeShop.name.length) {
      return {
        error: "Coffee Shop's name is empty",
      };
    }

    if (!coffeeShop.address.length) {
      return {
        error: "Coffee Shop's address is empty",
      };
    }

    coffeeShop.operationalHours = coffeeShop.operationalHours.filter((item) => {
      return item.day !== '';
    });

    for (let key in coffeeShop) {
      const IsEmptyArray = !coffeeShop[key].length;
      const IsInvalidArray =
        Array.isArray(coffeeShop[key]) && coffeeShop[key][0] === '';

      if (
        key !== 'name' &&
        key !== 'address' &&
        (IsEmptyArray || IsInvalidArray)
      ) {
        delete coffeeShop[key];
      }
    }

    return coffeeShop;
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const validated = submitValidation(coffeeShop);

    if (validated.error) {
      setError(validated.error);
    } else {
      setCoffeeShopData(validated, coffeeShopId, props.history);
    }
  };

  return (
    <React.Fragment>
      <div className={classes.CoffeeShop}>
        <div className={classes.MainDiv}>
          <form>
            <Header state={coffeeShop} setState={setCoffeeShop} />
            <Information state={coffeeShop} setState={setCoffeeShop} />
            <Images
              images={coffeeShop.images}
              coffeeShopName={coffeeShop.name}
              setImage={setImage}
              setReadyToSubmit={setReadyToSubmit}
              coffeeShopId={coffeeShopId}
            />
            {error && <ErrorMessage message={error} />}
            <div className={classes.BtnSubmit}>
              <BtnLarge
                clicked={submitHandler}
                btnType={readyToSubmit ? null : 'Disabled'}
              >
                Submit
              </BtnLarge>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default UpdateData;
