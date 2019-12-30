import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import profileMatching from "../../utilities/profileMatching";
import Filter from "./Filter/Filter";
import BestRecommendation from "./BestRecommendation/BestRecommendation";
import RecommendationLists from "./RecommendationLists/RecommendationLists";
import classes from "./Search.module.css";
import * as actions from "../../store/actions";
import Card from "../../components/UI/Card/Card";
import Spinner from "../../components/UI/Spinner/Spinner";
import noImage from  "../../assets/JavaDancerCoffee1.png"

const Search = props => {
  const userPreference = useSelector(state => state.member.preference);
  const rawCoffeeShopList = useSelector(state => state.allCoffeeShopList.lists);
  const dispatch = useDispatch();
  const getAllCoffeeShopList = useCallback(
    () => dispatch(actions.getAllCoffeeShopList()),
    [dispatch]
  );

  const [tempLists, setTempLists] = useState(null);

  useEffect(() => {
    getAllCoffeeShopList();
  }, [getAllCoffeeShopList]);

  useEffect(() => setTempLists(rawCoffeeShopList), [rawCoffeeShopList]);

  if (!tempLists) return <div className="spinner"><Spinner /></div>; // Change with Spinner (Change later)

  const redirectHandler = id => props.history.push(`/coffee-shop/${id}`);

  const filteredDataList = filteredList => setTempLists(filteredList);

  const userHasPreference = () => {
    if (!coffeeShopList.length) return null;
    const resultMatching = profileMatching(userPreference, coffeeShopList);
    const bestCoffeeShop = resultMatching[0];
    coffeeShopList = resultMatching.slice(1);

    const todayHours = bestCoffeeShop.operationalHours[todayDay];

    return (
      <BestRecommendation
        className={bestCoffeeShop.images ? bestCoffeeShop.images[0] : noImage}
        image={"./Starbuck3.png"}
        name={bestCoffeeShop.name}
        address={bestCoffeeShop.address}
        operationalHours={
          todayHours ? `${todayHours.open} - ${todayHours.close}` : "Close"
        }
        averagePrice={`Rp ${bestCoffeeShop.averagePrice}`}
        facilities={bestCoffeeShop.facilities}
        coffeeShopId={bestCoffeeShop.id}
      />
    );
  };

  const listIsEmpty = () => (
    <Card className={classes.ListIsEmpty}>
      <span>Empty</span>
    </Card>
  );

  let coffeeShopList = tempLists; // Default if not authenticated
  const coffeeShopListIsEmpty = !coffeeShopList.length
  const todayDay = new Date().getDay();

  return (
    <div className={classes.Search}>
      <div className={classes.Recommendation}>
        <div>
          <Filter
            allCoffeeShopList={rawCoffeeShopList}
            filterFunc={filteredDataList}
          />
        </div>
        <div>{userPreference ? userHasPreference() : null}</div>
        <div>
          {coffeeShopList.map(coffeeShop => {
            const todayHours = coffeeShop.operationalHours[todayDay];
            return (
              <RecommendationLists
                key={coffeeShop.id}
                image={coffeeShop.images ? coffeeShop.images[0] : noImage}
                name={coffeeShop.name}
                address={coffeeShop.address}
                operationalHours={
                  todayHours
                    ? `${todayHours.open} - ${todayHours.close}`
                    : "Close"
                }
                averagePrice={`Rp ${coffeeShop.averagePrice}`}
                redirect={redirectHandler}
                coffeeShopId={coffeeShop.id}
              />
            );
          })}
          {coffeeShopListIsEmpty ?  listIsEmpty() : null}
        </div>
      </div>
    </div>
  );
};

export default Search;
