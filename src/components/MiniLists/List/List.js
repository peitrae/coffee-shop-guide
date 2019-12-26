import React from "react";
import { NavLink } from "react-router-dom";

import { BtnSmall } from "../../UI/Button/Button";
import classes from "./List.module.css";


const List = props => {
  const {
    coffeeShopId,
    listImg,
    listName,
    listAddress,
    toUploadCoffeeShop,
    deleteHandler,
    showEditableButton
  } = props;

  return (
    <div className={classes.List}>
      <NavLink to={`/coffee-shop/${coffeeShopId}`}>
        <img
          src={listImg}
          alt="Small Coffee Shop" // Change
          className={classes.ImgList}
        />
      </NavLink>
      <div className={classes.DescList}>
        <NavLink to={`/coffee-shop/${coffeeShopId}`}>
          <h3 className={classes.NameList}>{listName}</h3>
          <span className={classes.AddressList}>{listAddress}</span>
        </NavLink>
        <div>
          {showEditableButton && (
            <div className={classes.ButtonDiv}>
              <BtnSmall clicked={toUploadCoffeeShop}>Edit</BtnSmall>
              <BtnSmall btnType="Danger" clicked={deleteHandler}>
                Delete
              </BtnSmall>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default List;
