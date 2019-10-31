import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "./Header/Header";
import Information from "./Information/Information";
import Images from "./Images/Images";
import { BtnLarge } from "../../components/UI/Button/Button";
import HeaderPict from "../../assets/Header.png";
import classes from "./UpdateCoffeeShop.module.css";
import * as actions from "../../store/actions";
import Spinner from "../../components/UI/Spinner/Spinner";

const UpdateData = props => {
  const coffeeShopId = props.match.params.id || null;

  const userLocalId = useSelector(state => state.member.localId);
  const coffeeShopData = useSelector(state => state.coffeeShop.data);
  const redirectToCoffeeShop = useSelector(state => state.coffeeShop.redirect);
  const dispatch = useDispatch();
  const setCoffeeShopData = (coffeeShopData, coffeeShopId) =>
    dispatch(actions.setCoffeeShopData(coffeeShopData, coffeeShopId));
  const getCoffeeShopData = useCallback(
    id => dispatch(actions.getCoffeeShopData(coffeeShopId)),
    [dispatch]
  );

  useEffect(() => {
    if (coffeeShopId) getCoffeeShopData(coffeeShopId);
  }, [coffeeShopId]);

  const [coffeeShop, setCoffeeShop] = useState({
    header: HeaderPict,
    name: "",
    address: "",
    averagePrice: 0,
    contact: "",
    facilities: [""],
    rating: [],
    operationalHours: [
      {
        close: "00:00",
        day: "",
        open: "00:00"
      }
    ],
    images: [],
    uploadedBy: userLocalId
  });

  useEffect(() => {
    const editCoffeeShop = coffeeShopId && coffeeShopData;
    if (editCoffeeShop) setCoffeeShop(coffeeShopData);
  }, [coffeeShopId, coffeeShopData]);

  useEffect(() => {
    if (userLocalId) setCoffeeShop({ ...coffeeShop, uploadedBy: userLocalId });
  }, [userLocalId]);

  if (redirectToCoffeeShop)
    props.history.push(`/coffee-shop/${redirectToCoffeeShop}`);

  const editCoffeeShopNotReady = coffeeShopId && !coffeeShopData;
  const addCoffeeShopNotReady = !userLocalId;

  if (editCoffeeShopNotReady || addCoffeeShopNotReady) return <div className="spinner"><Spinner /></div>;

  const sortingOperationalHours = coffeeShop => {
    coffeeShop.operationalHours.sort((a, b) => a.day - b.day);
    return coffeeShop;
  };

  const submitHandler = event => {
    event.preventDefault();
    const finishedCoffeeShopData = sortingOperationalHours(coffeeShop);
    setCoffeeShopData(finishedCoffeeShopData, coffeeShopId);
  };

  return (
    <div className={classes.CoffeeShop}>
      <div className={classes.MainDiv}>
        <form onSubmit={submitHandler}>
          <Header state={coffeeShop} setState={setCoffeeShop} />
          <Information state={coffeeShop} setState={setCoffeeShop} />
          <Images
            state={coffeeShop}
            setState={setCoffeeShop}
            coffeeShopId={coffeeShopId}
          />
          <div className={classes.BtnSubmit}>
            <BtnLarge btnName="Submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateData;