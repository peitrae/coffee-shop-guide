import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import List from "./List/List";
import MapView from "./MapView/MapView";

import * as actions from "../../store/actions";
import profileMatching from "../../utilities/profileMatching";
import "./Search.scss";

const Search = () => {
  const userPreference = useSelector((state) => state.member.preference);
  const coffeeShops = useSelector((state) => state.allCoffeeShopList.lists);
  const [userLocation, setUserLocation] = useState({
    lat: -7.983,
    long: 112.621,
  });
  const [userLocationError, setUserLocationError] = useState(null);

  const dispatch = useDispatch();
  const getCoffeeShops = useCallback(
    () => dispatch(actions.getAllCoffeeShopList()),
    [dispatch]
  );

  useEffect(() => {
    getCoffeeShops();
  }, [getCoffeeShops]);

  const setLocation = (location) => {
    // setUserLocation({
    //   ...userLocation,
    //   lat: location.coords.latitude,
    //   long: location.coords.longitude,
    // });
  };

  const setLocationError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        setUserLocationError("Geolocation is disabled");
        break;
      case error.POSITION_UNAVAILABLE:
        setUserLocationError("Location information is unavailable");
        break;
      case error.TIMEOUT:
        setUserLocationError("The request to get user location timed out");
        break;
      default:
        setUserLocationError("An unknown error occurred");
        break;
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(setLocation, setLocationError);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sortedCoffeeShops = profileMatching(
    userPreference,
    userLocation,
    coffeeShops
  );

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
          <MapView
            userLocation={userLocation}
            locationError={userLocationError}
            coffeeShops={filteredCoffeeShops || sortedCoffeeShops}
          />
        </div>
      </div>
    </>
  );
};

export default React.memo(Search);
