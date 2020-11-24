import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "../../../../components/UI/Modal/Modal";
import { Button } from "../../../../components/UI/Button/Button";
import Promo from "./Promo/Promo";
import PromoInput from "./PromoInput/PromoInput";
import WarningModal from "../WarningModal/WarningModal";
import Spinner from "../../../../components/UI/Spinner/Spinner";
import * as actions from "../../../../store/actions";
import ErrorMessage from "../../../../components/ErrorMessage/ErrorMessage";

import useClickOutside from "../../../../hooks/useClickOutside";

import "./Promos.scss";

const Promos = ({ coffeeShop, closeHandler }) => {
  const { id: coffeeShopId, name } = coffeeShop;

  const promoInputRef = useRef();
  const dispatch = useDispatch();

  const [deletePromoId, setDeletePromoId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [newPromo, setNewPromo] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    dispatch(actions.getCoffeeShopPromo(coffeeShopId));
  }, [coffeeShopId, dispatch]);

  const coffeeShopPromo = useSelector(({ coffeeShop }) => coffeeShop.promo);

  const showFormClickHandler = () => setShowForm(!showForm);

  const inputChangeHandler = (e) => setNewPromo(e.target.value);

  const showWarningClickHandler = (promoId) => setDeletePromoId(promoId);

  const closeWarningClickHandler = () => setDeletePromoId(null);

  const submitPromoClickHandler = () => {
    if (newPromo !== "") {
      dispatch(actions.setCoffeeShopPromo(newPromo, coffeeShopId));
      setNewPromo("");
    } else {
      setError("Promo is empty");
    }
  };

  const deletePromoHandler = () => {
    dispatch(actions.deleteCoffeeShopPromo(deletePromoId, coffeeShopId));
    setDeletePromoId(null);
  };

  const closeClickHandler = () => {
    setError(null);
    closeHandler();
  };

  useClickOutside(promoInputRef, showFormClickHandler);

  if (coffeeShopPromo && coffeeShopPromo.coffeeShopId !== coffeeShopId) {
    return (
      <Modal show={true} close={closeClickHandler} className="edit-promo">
        <Spinner className="edit-promo-spinner" />
      </Modal>
    );
  }

  return (
    <>
      <Modal show={true} close={closeClickHandler} className="owner-promo">
        <h1 className="owner-promo-title">{name}</h1>
        {error ? (
          <ErrorMessage className="owner-promo-error">{error}</ErrorMessage>
        ) : null}
        {coffeeShopPromo?.list
          ? Object.keys(coffeeShopPromo.list).map((promoId) => (
              <Promo
                key={promoId}
                promoId={promoId}
                coffeeShopId={coffeeShopId}
                value={coffeeShopPromo.list[promoId].value}
                deleteHandler={showWarningClickHandler}
                setError={setError}
              />
            ))
          : null}
        <div className="owner-promo-add">
          {showForm ? (
            <PromoInput
              value={newPromo}
              inputChangeHandler={inputChangeHandler}
              submitClickHandler={submitPromoClickHandler}
              closeHandler={showFormClickHandler}
            />
          ) : (
            <Button className="add-btn" onClick={showFormClickHandler}>
              Add Promo
            </Button>
          )}
        </div>
      </Modal>
      {deletePromoId ? (
        <WarningModal
          message="Are you sure want to delete this promo?"
          closeHandler={closeWarningClickHandler}
          submitHandler={deletePromoHandler}
        />
      ) : null}
    </>
  );
};

export default Promos;
