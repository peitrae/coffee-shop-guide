import React, { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";

import Navbar from "../../components/UI/Navbar";
import Card from "../../components/UI/Card";
import Spinner from "../../components/UI/Spinner";
import Filter from "./components/Filter";
import List from "./components/List";
import MapView from "./components/MapView";

import profileMatching from "./utils/profileMatching";
import getCoffeeShops from "./utils/getCoffeeShops";

const Search = () => {
  const userPreference = useSelector(({ member }) => member.preference);

  const [unsortedCoffeeShop, setUnsortedCoffeeShops] = useState(null);
  const [filteredCoffeeShops, setFilteredCoffeeShops] = useState(null);
  const [userLocation, setUserLocation] = useState({
    lat: -7.983,
    long: 112.621,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      const unsortedCoffeeShop = await getCoffeeShops();
      setUnsortedCoffeeShops(unsortedCoffeeShop);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(setLocation, setLocationError);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setLocation = (location) => {
    setUserLocation({
      ...userLocation,
      lat: location.coords.latitude,
      long: location.coords.longitude,
    });
  };

  const setLocationError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        setUserLocation({ ...userLocation, error: "Geolocation tidak tersedia. Mohon aktifkan geolocation pada peramban" });
        break;
      case error.POSITION_UNAVAILABLE:
        setUserLocation({
          ...userLocation,
          error: "Informasi lokasi tidak tersedia",
        });
        break;
      case error.TIMEOUT:
        setUserLocation({
          ...userLocation,
          error: "Permintaan lokasi terlalu lama",
        });
        break;
      default:
        setUserLocation({
          ...userLocation,
          error: "Terjadi kegagalan pada permintaan lokasi",
        });
        break;
    }
  };

  const handleSetFilteredCoffeShops = (coffeeShops) => {
    setFilteredCoffeeShops(coffeeShops);
  };

  const sortedCoffeeShops = useMemo(() => {
    return profileMatching(userPreference, unsortedCoffeeShop);
  }, [unsortedCoffeeShop, userPreference]);

  const list = filteredCoffeeShops || sortedCoffeeShops;

  return (
    <>
      <Navbar />
      <div className="search">
        <div className="search__panel-list">
          <Filter
            coffeeShops={sortedCoffeeShops}
            handleSetFilteredCoffeShops={handleSetFilteredCoffeShops}
          />
          {list && list.length ? (
            <List coffeeShops={filteredCoffeeShops || sortedCoffeeShops} />
          ) : list && !list.length ? (
            <Card className="search__empty">Empty</Card>
          ) : (
            <Spinner />
          )}
        </div>
        <div className="search__panel-map">
          <MapView
            userLocation={userLocation}
            coffeeShops={filteredCoffeeShops || sortedCoffeeShops}
          />
        </div>
      </div>
    </>
  );
};

export default Search;
