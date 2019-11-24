import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./List.module.css";
import { BtnSmall } from "../../UI/Button/Button";

const List = props => (
  <div className={classes.List}>
    <NavLink to={`/coffee-shop/${props.coffeeShopId}`}>
      <img
        src={props.listImg}
        alt="Small Coffee Shop" // Change
        className={classes.ImgList}
        onClick={props.toCoffeeShop}
      />
    </NavLink>
    <div className={classes.DescList}>
      <NavLink to={`/coffee-shop/${props.coffeeShopId}`}>
        <h3 className={classes.NameList}>{props.listName}</h3>
        <span className={classes.AddressList}>{props.listAddress}</span>
      </NavLink>
      <div>
        {props.showEditableButton && (
          <div className={classes.ButtonDiv}>
            <BtnSmall btnName="Edit" clicked={props.toUploadCoffeeShop} />
            <BtnSmall
              btnName="Delete"
              btnType="Danger"
              clicked={props.deleteHandler}
            />
          </div>
        )}
      </div>
    </div>
  </div>
);

export default List;
