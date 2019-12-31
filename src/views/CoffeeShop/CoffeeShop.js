import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "./Header/Header";
import Picture from "./Picture/Picture";
import Information from "./Information/Information";
import classes from "./CoffeeShop.module.css";
import * as actions from "../../store/actions";
import Spinner from "../../components/UI/Spinner/Spinner";
import SuggestionList from "./SuggestionList/SuggestionList";

const CoffeeShop = props => {
  const coffeeShopData = useSelector(state => state.coffeeShop.data);

  const dispatch = useDispatch();
  const getCoffeeShopData = useCallback(
    id => dispatch(actions.getCoffeeShopData(id)),
    [dispatch]
  );

  const coffeeShopId = props.match.params.id;

  useEffect(() => {
    getCoffeeShopData(coffeeShopId);
  }, [coffeeShopId]);

  if (!coffeeShopData)
    return (
      <div className="spinner">
        <Spinner />
      </div>
    );

  return (
    <div className={classes.CoffeeShop}>
      <div className={classes.MainDiv}>
        <Header />
        <Information />
        <Picture />
      </div>
      <div className={classes.RightDiv}>
        <SuggestionList />
      </div>
    </div>
  );
};

export default CoffeeShop;
