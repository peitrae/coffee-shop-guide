import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "../../../../components/UI/Modal/Modal";
import { Button } from "../../../../components/UI/Button/Button";
import TextForm from "../../../../components/UI/TextForm/TextForm";
import PromoItem from "./PromoItem/PromoItem";
import * as actions from "../../../../store/actions";

import useClickOutside from "../../../../hooks/useClickOutside";

import "./Promo.scss";

const Promo = ({ coffeeShop, closeClickHandler }) => {
  const { id: coffeeShopId, name } = coffeeShop;

  const promoInputRef = useRef();
  const dispatch = useDispatch();

  const [showForm, setShowForm] = useState(false);
  const [promo, setPromo] = useState("");

  useEffect(() => {
    dispatch(actions.getCoffeeShopPromo(coffeeShopId));
  }, [coffeeShopId, dispatch]);

  const promoList = useSelector(({ coffeeShop }) => coffeeShop.promo);

  const showFormClickHandler = () => setShowForm(!showForm);

  const promoTextChangeHandler = (e) => setPromo(e.target.value);

  const deletePromoClickHandler = (promoId) => {
    dispatch(actions.deleteCoffeeShopPromo(promoId, coffeeShopId));
  };

  const submitPromoClickHandler = () => {
    dispatch(actions.setCoffeeShopPromo(promo, coffeeShopId));
  };

  useClickOutside(promoInputRef, showFormClickHandler);

  return (
    <Modal show={true} close={closeClickHandler} className="edit-promo">
      <h1 className="edit-promo-title">{name}</h1>
      {promoList
        ? Object.keys(promoList).map((promoId) => (
            <PromoItem
              key={promoId}
              promoId={promoId}
              value={promoList[promoId].value}
              deleteClickHandler={deletePromoClickHandler}
            />
          ))
        : null}
      <div className="edit-promo-add">
        {showForm ? (
          <div className="edit-promo-input" ref={promoInputRef}>
            <TextForm
              id="promo"
              placeholder="Promo"
              value={promo}
              inputHandler={promoTextChangeHandler}
            />
            <Button className="submit-btn" onClick={submitPromoClickHandler}>
              Add
            </Button>
          </div>
        ) : (
          <Button className="add-btn" onClick={showFormClickHandler}>
            Add Promo
          </Button>
        )}
      </div>
    </Modal>
  );
};

export default Promo;
