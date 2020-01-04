import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "./Header/Header";
import Picture from "./Picture/Picture";
import Information from "./Information/Information";
import classes from "./CoffeeShop.module.css";
import * as actions from "../../store/actions";
import Spinner from "../../components/UI/Spinner/Spinner";
import SuggestionList from "./SuggestionList/SuggestionList";
import Footer from "../../components/UI/Footer/Footer";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!coffeeShopData) return <Spinner />;

  return (
    <React.Fragment>
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
      <Footer />
    </React.Fragment>
  );
};

export default CoffeeShop;
