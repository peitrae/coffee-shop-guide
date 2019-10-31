import React from "react";

import classes from "./List.module.css";
import { BtnSmall } from "../../UI/Button/Button";

const List = props => (
  <div className={classes.List}>
    <img
      src={props.listImg}
      alt="Small Coffee Shop" // Change
      className={classes.ImgList}
      onClick={props.toCoffeeShop}
    />
    <div className={classes.DescList}>
      <div onClick={props.toCoffeeShop}>
        <h3 className={classes.NameList}>{props.listName}</h3>
        <span className={classes.AddressList}>{props.listAddress}</span>
      </div>
      <div>
        {props.showEditableButton && (
          <div className={classes.ButtonDiv}>
            <BtnSmall btnName="Edit" clicked={props.toUploadCoffeeShop} />
            <BtnSmall btnName="Hapus" btnType="Danger" clicked={props.deleteHandler}/>
          </div>
        )}
      </div>
    </div>
  </div>
);

export default List;
