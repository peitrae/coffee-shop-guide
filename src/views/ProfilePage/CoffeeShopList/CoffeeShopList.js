import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import MiniList from "../../../components/MiniList/MiniList";
import WarningModal from "./WarningModal/WarningModal";
import Promos from "./Promos/Promos";
import * as actions from "../../../store/actions";

const CoffeeShopList = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [warning, setWarning] = useState(false);
  const [showPromo, setShowPromo] = useState(false);
  const [deleteSelected, setDeleteSelected] = useState(null);

  const { localId, coffeeShopList } = useSelector((state) => state.member);

  const editCoffeeShopHandler = (coffeeShopId) =>
    history.push(`/update-coffee-shop/${coffeeShopId}`);

  const deleteCoffeeShop = (coffeeShopId) =>
    dispatch(actions.deleteCoffeeShop(coffeeShopId));

  useEffect(() => {
    if (localId) {
      dispatch(actions.getCoffeeShopUploadedBy(localId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localId]);

  const closeWarningClickHandler = () => {
    setDeleteSelected(null);
    setWarning(null);
  };

  const deleteCoffeeShopHandler = (coffeeShopId) => {
    setDeleteSelected(coffeeShopId);
    setWarning("Are you sure want to delete the coffee shop?");
  };

  const deleteWarningHandler = () => {
    deleteCoffeeShop(deleteSelected);
    setWarning(null);
    setDeleteSelected(null);
  };

  const showPromoClickHandler = (coffeeShop) => setShowPromo(coffeeShop);

  const closePromoHandler = () => setShowPromo(false);

  return (
    <>
      <MiniList
        title="Your Page"
        list={coffeeShopList}
        editHandler={editCoffeeShopHandler}
        deleteHandler={deleteCoffeeShopHandler}
        editPromoClickHandler={showPromoClickHandler}
      />
      {warning ? (
        <WarningModal
          message={warning}
          closeHandler={closeWarningClickHandler}
          submitHandler={deleteWarningHandler}
        />
      ) : null}
      {showPromo ? (
        <Promos
          coffeeShop={showPromo}
          closeHandler={closePromoHandler}
        />
      ) : null}
    </>
  );
};

export default CoffeeShopList;
