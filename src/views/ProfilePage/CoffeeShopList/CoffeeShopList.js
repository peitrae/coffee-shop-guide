import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";

import MiniLists from "../../../components/MiniLists/MiniLists";
import * as actions from "../../../store/actions";

const CoffeeShopList = props => {
  const coffeeShopList = useSelector(state => state.member.coffeeShopList);

  const { localId } = props;

  const dispatch = useDispatch();
  const getCoffeeShopUploadedBy = useCallback(
    localId => dispatch(actions.getCoffeeShopUploadedBy(localId)),
    [localId]
  );

  const editCoffeeShopHandler = coffeeShopId =>
    props.history.push(`/update-coffee-shop/${coffeeShopId}`);

  const deleteCoffeeShop = coffeeShopId =>
    dispatch(actions.deleteCoffeeShop(coffeeShopId));

  useEffect(() => {
    getCoffeeShopUploadedBy(localId);
  }, [localId]);

  const deleteCoffeeShopHandler = coffeeShopId => {
    deleteCoffeeShop(coffeeShopId);
  };

  return (
    <MiniLists
      headerList="Your Page"
      coffeeShopList={coffeeShopList}
      showEditableButton
      editHandler={editCoffeeShopHandler}
      deleteHandler={deleteCoffeeShopHandler}
    />
  );
};

export default withRouter(CoffeeShopList);
