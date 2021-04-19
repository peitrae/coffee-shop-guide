import React from "react";

import BestItem from "./components/BestItem";
import CoffeeShopItem from "./components/CoffeeShopItem";

const List = ({ coffeeShops }) => (
  <div className="search__list">
    <BestItem coffeeShop={coffeeShops[0]} />
    {coffeeShops.slice(1).map((coffeeShop) => (
      <CoffeeShopItem key={coffeeShop.id} coffeeShop={coffeeShop} />
    ))}
  </div>
);
export default List;
