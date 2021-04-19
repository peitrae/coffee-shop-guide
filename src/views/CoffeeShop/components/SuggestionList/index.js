import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

import MiniList from "../../../../components/MiniList";
import getCoffeeShops from "./utils/getCoffeeShops";

const SuggestionList = () => {
  const { id: coffeeShopId } = useParams();
  const [coffeeShops, setCoffeeShops] = useState({ data: [], loading: false });

  useEffect(() => {
    const fetchData = async () => {
      setCoffeeShops({ ...coffeeShops, loading: true });

      const data = await getCoffeeShops();
      const filteredCoffeeShops = data.filter((coffeeShop, index) => {
        return coffeeShop.id !== coffeeShopId && index < 6;
      });
      setCoffeeShops({ data: filteredCoffeeShops, loading: false });
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MiniList
      title="You might also like"
      loading={coffeeShops.loading}
      list={coffeeShops.data}
      className="margin-l-24"
    />
  );
};

export default SuggestionList;
