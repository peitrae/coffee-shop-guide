import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";

import MiniList from "../../../components/MiniList/MiniList";
import WarningModal from "./WarningModal/WarningModal";
import * as actions from "../../../store/actions";

const CoffeeShopList = props => {
  const [showWarning, setShowWarning] = useState(false);
  const [deleteSelected, setDeleteSelected] = useState(null);

  const coffeeShopList = useSelector(state => state.member.coffeeShopList);

  const { localId } = props;

  const dispatch = useDispatch();

  const editCoffeeShopHandler = coffeeShopId =>
    props.history.push(`/update-coffee-shop/${coffeeShopId}`);

  const deleteCoffeeShop = coffeeShopId =>
    dispatch(actions.deleteCoffeeShop(coffeeShopId));

  useEffect(() => {
    if(localId) {
      dispatch(actions.getCoffeeShopUploadedBy(localId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localId]);

  const cancelWarningHandler = () => {
    setDeleteSelected(null);
    setShowWarning(false);
  };

  const deleteCoffeeShopHandler = coffeeShopId => {
    setDeleteSelected(coffeeShopId);
    setShowWarning(true);
  };

  const deleteWarningHandler = () => {
    deleteCoffeeShop(deleteSelected);
    setShowWarning(false);
    setDeleteSelected(null);
  };

  return (
    <>
      <MiniList
        title="Your Page"
        list={coffeeShopList}
        editHandler={editCoffeeShopHandler}
        deleteHandler={deleteCoffeeShopHandler}
      />
      {showWarning ? (
        <WarningModal
          show={showWarning}
          cancelHandler={cancelWarningHandler}
          submitWarningHandler={deleteWarningHandler}
        />
      ) : null}
    </>
  );
};

export default withRouter(CoffeeShopList);
