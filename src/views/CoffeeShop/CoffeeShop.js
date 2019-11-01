import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "./Header/Header";
import Picture from "./Picture/Picture";
import Information from "./Information/Information";
import classes from "./CoffeeShop.module.css";
import MiniLists from "../../components/MiniLists/MiniLists";
import * as actions from "../../store/actions";
import Spinner from "../../components/UI/Spinner/Spinner";

const CoffeeShop = props => {
  const coffeeShopData = useSelector(state => state.coffeeShop.data);
  const coffeeShopList = useSelector(state => state.allCoffeeShopList.lists);

  const dispatch = useDispatch();
  const getCoffeeShopData = useCallback(
    id => dispatch(actions.getCoffeeShopData(id)),
    [dispatch]
  );
  const getCoffeeShopList = useCallback(
    () => dispatch(actions.getAllCoffeeShopList()),
    [dispatch]
  );

  const coffeeShopId = props.match.params.id;

  useEffect(() => {
    getCoffeeShopData(coffeeShopId);
  }, [coffeeShopId]);

  useEffect(() => {
    getCoffeeShopList();
  }, []);

  if (!coffeeShopData || !coffeeShopList) return <div className="spinner"><Spinner /></div>;

  const filteredCoffeeShopList = coffeeShopList.filter(
    (list, index) => list.id !== coffeeShopId && index < 6
  );

  return (
    <div className={classes.CoffeeShop}>
      <div className={classes.MainDiv}>
        <Header coffeeShopId={coffeeShopId}/>
        <Information />
        <Picture />
      </div>
      <div className={classes.RightDiv}>
        <MiniLists
          headerList="You might also like"
          coffeeShopList={filteredCoffeeShopList}
        />
      </div>
    </div>
  );
};

export default CoffeeShop;
