import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import Filter from "./Filter/Filter";
import BestRecommendation from "./BestRecommendation/BestRecommendation";
import CoffeeShopItem from "./CoffeeShopItem/CoffeeShopItem";
import Card from "../../../components/UI/Card/Card";
import Spinner from "../../../components/UI/Spinner/Spinner";

import * as actions from "../../../store/actions";
import profileMatching from "../../../utilities/profileMatching";
import "./List.scss";

const List = () => {
  const userPreference = useSelector((state) => state.member.preference);
  const rawCoffeeShopList = useSelector(
    (state) => state.allCoffeeShopList.lists
  );
  const dispatch = useDispatch();
  const getCoffeeShopList = useCallback(
    () => dispatch(actions.getAllCoffeeShopList()),
    [dispatch]
  );

  const [tempLists, setTempLists] = useState(null);

  useEffect(() => {
    getCoffeeShopList();
  }, [getCoffeeShopList]);

  useEffect(() => setTempLists(rawCoffeeShopList), [rawCoffeeShopList]);

  if (!tempLists) {
    return <Spinner />;
  }

  const filteredDataList = (filteredList) => setTempLists(filteredList);

  const userHasPreference = () => {
    if (!coffeeShopList.length) return null;
    if (!userPreference && !coffeeShopList) {
      return false;
    }
    const resultMatching = profileMatching(userPreference, coffeeShopList);
    const bestCoffeeShop = resultMatching[0];
    coffeeShopList = resultMatching.slice(1);

    return <BestRecommendation coffeeShop={bestCoffeeShop} />;
  };

  let coffeeShopList = tempLists;

  return (
    
        <div className="search-result-list">
          <Filter
            allCoffeeShopList={rawCoffeeShopList}
            filterFunc={filteredDataList}
          />
          <div>{userPreference ? userHasPreference() : null}</div>
          {coffeeShopList ? (
            coffeeShopList.map((coffeeShop) => (
              <CoffeeShopItem
                key={coffeeShop.id}
                coffeeShop={coffeeShop}
              />
            ))
          ) : (
            <Card className="search-result-empty">
              <span>Empty</span>
            </Card>
          )}
        </div>
  );
};

export default React.memo(List);
