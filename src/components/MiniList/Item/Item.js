import React from "react";
import { NavLink } from "react-router-dom";

import { BtnSmall } from "../../UI/Button/Button";
import defaultIco from "../../../assets/no-image.png";

import "./Item.scss";

const Item = ({ coffeeShop, editHandler, deleteHandler }) => {
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
      <div className="minilist-item-text">
        <NavLink to={`/coffee-shop/${coffeeShop_id}`}>
          <h3 className="item-name">{name}</h3>
          <span className="item-address">{address}</span>
        </NavLink>
        <div>
          <div className="minilist-item-controls">
            {editHandler ? (
              <BtnSmall clicked={() => editHandler(coffeeShop_id)}>Edit</BtnSmall>
            ) : null}
            {deleteHandler ? (
              <BtnSmall btnType="Danger" clicked={() => deleteHandler(coffeeShop_id)}>
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
