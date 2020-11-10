import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "../../../../components/UI/Modal/Modal";
import { Button } from "../../../../components/UI/Button/Button";
import PromoItem from "./PromoItem/PromoItem";
import PromoInput from "./PromoInput/PromoInput";
import WarningModal from "../WarningModal/WarningModal";
import Spinner from "../../../../components/UI/Spinner/Spinner";
import * as actions from "../../../../store/actions";

import useClickOutside from "../../../../hooks/useClickOutside";

import "./Promo.scss";

const Promo = ({ coffeeShop, closeClickHandler }) => {
  const { id: coffeeShopId, name } = coffeeShop;

  const promoInputRef = useRef();
  const dispatch = useDispatch();

  const [deletePromoId, setDeletePromoId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [newPromo, setNewPromo] = useState("");

  useEffect(() => {
    dispatch(actions.getCoffeeShopPromo(coffeeShopId));
  }, [coffeeShopId, dispatch]);

  const coffeeShopPromo = useSelector(({ coffeeShop }) => coffeeShop.promo);

  const showFormClickHandler = () => setShowForm(!showForm);

  const promoTextChangeHandler = (e) => setNewPromo(e.target.value);

  const showWarningClickHandler = (promoId) => setDeletePromoId(promoId);

  const closeWarningClickHandler = () => setDeletePromoId(null);

  const submitPromoClickHandler = () => {
    dispatch(actions.setCoffeeShopPromo(newPromo, coffeeShopId));
    setNewPromo("");
  };

  const deletePromoHandler = () => {
    dispatch(actions.deleteCoffeeShopPromo(deletePromoId, coffeeShopId));
    setDeletePromoId(null);
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
      <Modal show={true} close={closeClickHandler} className="edit-promo">
        <h1 className="edit-promo-title">{name}</h1>
        {coffeeShopPromo?.list
          ? Object.keys(coffeeShopPromo.list).map((promoId) => (
              <PromoItem
                key={promoId}
                promoId={promoId}
                value={coffeeShopPromo.list[promoId].value}
                deleteClickHandler={showWarningClickHandler}
              />
            ))
          : null}
        <div className="edit-promo-add">
          {showForm ? (
            <PromoInput
              ref={promoInputRef}
              value={newPromo}
              textChangeHandler={promoTextChangeHandler}
              submitClickHandler={submitPromoClickHandler}
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

export default Promo;
