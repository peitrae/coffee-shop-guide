import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import MiniList from "../../../components/MiniList/MiniList";
import WarningModal from "./WarningModal/WarningModal";
import Promo from "./Promo/Promo";
import * as actions from "../../../store/actions";

const CoffeeShopList = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [showWarning, setShowWarning] = useState(false);
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

  const cancelWarningHandler = () => {
    setDeleteSelected(null);
    setShowWarning(false);
  };

  const deleteCoffeeShopHandler = (coffeeShopId) => {
    setDeleteSelected(coffeeShopId);
    setShowWarning(true);
  };

  const deleteWarningHandler = () => {
    deleteCoffeeShop(deleteSelected);
    setShowWarning(false);
    setDeleteSelected(null);
  };

  const showPromoClickHandler = (coffeeShop) => setShowPromo(coffeeShop);

  const closePromoClickHandler = () => setShowPromo(false);

  return (
    <>
      <MiniList
        title="Your Page"
        list={coffeeShopList}
        editHandler={editCoffeeShopHandler}
        deleteHandler={deleteCoffeeShopHandler}
        editPromoClickHandler={showPromoClickHandler}
      />
      {showWarning ? (
        <WarningModal
          show={showWarning}
          cancelHandler={cancelWarningHandler}
          submitWarningHandler={deleteWarningHandler}
        />
      ) : null}
      {showPromo ? (
        <Promo
          coffeeShop={showPromo}
          closeClickHandler={closePromoClickHandler}
        />
      ) : null}
    </>
  );
};

export default CoffeeShopList;
