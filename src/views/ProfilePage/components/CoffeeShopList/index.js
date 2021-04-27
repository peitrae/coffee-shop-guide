import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

import MiniList from "../../../../components/MiniList";
import WarningModal from "./components/WarningModal";
import Promos from "./components/Promos";
import getCoffeeShopsByOwnerId from "./utils/getCoffeeShopsByOwnerId";
import deleteCoffeeShop from "./utils/deleteCoffeeShop";

const CoffeeShopList = () => {
  const history = useHistory();

  const localId = useSelector(({ member }) => member.localId);

  const [warning, setWarning] = useState(false);
  const [promo, setPromo] = useState({
    coffeeShopId: null,
    coffeeShopName: null,
    show: false,
  });
  const [coffeeShops, setCoffeeShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteCoffeShopById, setDeleteCoffeeShopById] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const coffeeShops = await getCoffeeShopsByOwnerId(localId);
      setCoffeeShops(coffeeShops);
      setLoading(false);
    };

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEditCoffeeShop = (coffeeShopId) => {
    history.push(`/update-coffeeshop/${coffeeShopId}`);
  };

  const handleCloseWarning = () => {
    setDeleteCoffeeShopById(null);
    setWarning(null);
  };

  const handleShowWarning = (coffeeShopId) => {
    setDeleteCoffeeShopById(coffeeShopId);
    setWarning("Are you sure want to delete the coffee shop?");
  };

  const handleDeleteCoffeeShop = async () => {
    setLoading(true);
    setWarning(null);
    setDeleteCoffeeShopById(null);

    const coffeeShops = await deleteCoffeeShop(deleteCoffeShopById);
    setCoffeeShops(coffeeShops);
    setLoading(false);
  };

  const handleShowPromo = (coffeeShop) => {
    setPromo({
      coffeeShopId: coffeeShop.id,
      coffeeShopName: coffeeShop.name,
      show: true,
    });
  };

  const handleClosePromo = () => {
    setPromo({ ...promo, show: false });
  };

  return (
    <>
      <MiniList
        title="Your Page"
        list={coffeeShops}
        loading={loading}
        handleEdit={handleEditCoffeeShop}
        handleDelete={handleShowWarning}
        handleEditPromo={handleShowPromo}
        className="margin-l-24"
      />
      {warning ? (
        <WarningModal
          message={warning}
          handleClose={handleCloseWarning}
          handleSubmit={handleDeleteCoffeeShop}
        />
      ) : null}
      {promo.show ? (
        <Promos
          coffeeShopId={promo.coffeeShopId}
          coffeeShopName={promo.coffeeShopName}
          handleClose={handleClosePromo}
        />
      ) : null}
    </>
  );
};

export default CoffeeShopList;
