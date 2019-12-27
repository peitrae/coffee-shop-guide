import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";

import MiniLists from "../../../components/MiniLists/MiniLists";
import WarningModal from "./WarningModal/WarningModal";
import * as actions from "../../../store/actions";

const CoffeeShopList = props => {
  const [showWarning, setShowWarning] = useState(true);

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

  const cancelWarningHandler = () => setShowWarning(false);

  const deleteCoffeeShopHandler = coffeeShopId => {
    deleteCoffeeShop(coffeeShopId);
  };

  return (
    <React.Fragment>
      <MiniLists
        headerList="Your Page"
        coffeeShopList={coffeeShopList}
        showEditableButton
        editHandler={editCoffeeShopHandler}
        deleteHandler={deleteCoffeeShopHandler}
      />
      {showWarning ? (
        <WarningModal
          show={showWarning}
          cancelHandler={cancelWarningHandler}
          submitWarningHandler={deleteCoffeeShopHandler}
        />
      ) : null}
    </React.Fragment>
  );
};

export default withRouter(CoffeeShopList);
