import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router";
import * as actions from "../../store/actions";

import classes from "./MiniLists.module.css";
import Card from "../UI/Card/Card";
import List from "./List/List";
import defaultIco from "../../assets/Starbuck3.png";
import Spinner from "../UI/Spinner/Spinner";

const MiniLists = props => {
  const { headerList, coffeeShopList, deleteClicked } = props;

  const dispatch = useDispatch();
  const deleteCoffeeShop = useCallback(
    coffeeShopId => dispatch(actions.deleteCoffeeShop(coffeeShopId)),
    [dispatch]
  );

  if (!coffeeShopList) {
    return (
      <Card cardType={classes.MiniLists}>
        <Spinner />
      </Card>
    ); // Spinner
  }

  const toCoffeeShop = coffeeShopId =>
    props.history.push(`/coffee-shop/${coffeeShopId}`);

  const toUploadCoffeeShop = coffeeShopId =>
    props.history.push(`/update-coffee-shop/${coffeeShopId}`);

  const deleteCoffeeShopHandler = coffeeShopId => {
    deleteCoffeeShop(coffeeShopId);
    deleteClicked(true);
    console.log(coffeeShopId);
  };

  return (
    <Card cardType={classes.MiniLists}>
      <h2 className={classes.HeaderList}>{headerList}</h2>
      {coffeeShopList.map(coffeeShop => {
        let ico = defaultIco;
        if (coffeeShop.images) {
          ico = coffeeShop.images[0];
        }
        return (
          <List
            key={coffeeShop.id}
            listImg={ico}
            listName={coffeeShop.name}
            listAddress={coffeeShop.address}
            toCoffeeShop={() => toCoffeeShop(coffeeShop.id)}
            toUploadCoffeeShop={() => toUploadCoffeeShop(coffeeShop.id)}
            deleteHandler={() => deleteCoffeeShopHandler(coffeeShop.id)}
            showEditableButton={props.showEditableButton}
          />
        );
      })}
    </Card>
  );
};

export default withRouter(React.memo(MiniLists));
