import React from "react";
import { NavLink } from "react-router-dom";

import { BtnSmall } from "../../UI/Button/Button";
import defaultIco from "../../../assets/no-image.png";

import "./Item.scss";

const Item = ({
  coffeeShop,
  editHandler,
  deleteHandler,
  editPromoClickHandler,
}) => {
  const { id: coffeeShop_id, name, address, images } = coffeeShop;

  return (
    <div className="minilist-item">
      <NavLink to={`/coffee-shop/${coffeeShop_id}`}>
        <img
          src={images ? images[0] : defaultIco}
          alt={name}
          className="minilist-item-img"
        />
      </NavLink>
      <div className="minilist-item-desc">
        <NavLink to={`/coffee-shop/${coffeeShop_id}`}>
          <h3 className="item-name">{name}</h3>
          <span className="item-address">{address}</span>
        </NavLink>
        <div className="item-controls">
          <div className="controls-left">
            {editPromoClickHandler ? (
              <BtnSmall clicked={() => editPromoClickHandler(coffeeShop)}>
                Edit Promo
              </BtnSmall>
            ) : null}
          </div>
          <div className="controls-right">
            {editHandler ? (
              <BtnSmall clicked={() => editHandler(coffeeShop_id)}>
                Edit
              </BtnSmall>
            ) : null}
            {deleteHandler ? (
              <BtnSmall
                btnType="Danger"
                clicked={() => deleteHandler(coffeeShop_id)}
              >
                Delete
              </BtnSmall>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
