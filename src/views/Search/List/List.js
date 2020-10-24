import React, { useState } from "react";

import Filter from "./Filter/Filter";
import BestRecommendation from "./BestRecommendation/BestRecommendation";
import CoffeeShopItem from "./CoffeeShopItem/CoffeeShopItem";
import Card from "../../../components/UI/Card/Card";
import Spinner from "../../../components/UI/Spinner/Spinner";

import "./List.scss";

const List = ({ sortedCoffeeShops }) => {
  const [filteredCoffeeShops, setFilteredCoffeeShops] = useState(null);

  const onFilterCoffeeShops = (coffeeShops) => {
    setFilteredCoffeeShops(coffeeShops);
  }

  if (!sortedCoffeeShops) {
    return <Spinner />;
  }

  const coffeeShops = filteredCoffeeShops || sortedCoffeeShops; 

  return (
    <div className="search-result-list">
    <Filter
      coffeeShops={sortedCoffeeShops}
      onFilterCoffeeShops={onFilterCoffeeShops}
    />
      {coffeeShops ? <BestRecommendation coffeeShop={coffeeShops[0]} /> : null}
      {coffeeShops ? (
        coffeeShops
          .slice(1)
          .map((coffeeShop) => (
            <CoffeeShopItem key={coffeeShop.id} coffeeShop={coffeeShop} />
          ))
      ) : (
        <Card className="search-result-empty">
          <span>Empty</span>
        </Card>
      )}
    </div>
  );
};
export default List;
