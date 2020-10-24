import React, { useState, useEffect, useCallback } from "react";
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

  const [filteredCoffeeShops, setFilteredCoffeeShops] = useState(null);

  const onFilterCoffeeShops = (coffeeShops) => {
    setFilteredCoffeeShops(coffeeShops);
  };

  return (
    <>
      <div className="search-result">
        <List
          filteredCoffeeShops={filteredCoffeeShops}
          sortedCoffeeShops={sortedCoffeeShops}
          onFilter={onFilterCoffeeShops}
        />
        <div className="search-result-map">
          <MapView coffeeShops={filteredCoffeeShops || sortedCoffeeShops} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default React.memo(Search);
