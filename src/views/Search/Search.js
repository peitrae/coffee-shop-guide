import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import List from "./List/List";
import MapView from "./MapView/MapView";
import Footer from "../../components/UI/Footer/Footer";

import * as actions from "../../store/actions";
import profileMatching from "../../utilities/profileMatching";
import "./Search.scss";

const Search = () => {
  const userPreference = useSelector((state) => state.member.preference);
  const coffeeShops = useSelector((state) => state.allCoffeeShopList.lists);
  
  const dispatch = useDispatch();
  const getCoffeeShops = useCallback(
    () => dispatch(actions.getAllCoffeeShopList()),
    [dispatch]
  );

  useEffect(() => {
    getCoffeeShops();
  }, [getCoffeeShops]);

  const sortedCoffeeShops = profileMatching(userPreference, coffeeShops);

  return (
    <>
      <div className="search-result">
        <List
          sortedCoffeeShops={sortedCoffeeShops}
        />
        <div className="search-result-map">
          <MapView coffeeShops={sortedCoffeeShops}/>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default React.memo(Search);
