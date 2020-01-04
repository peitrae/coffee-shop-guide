import React from "react";

import classes from "./MiniLists.module.css";
import Card from "../UI/Card/Card";
import List from "./List/List";
import defaultIco from "../../assets/Starbuck3.png";
import Spinner from "../UI/Spinner/Spinner";

const MiniLists = props => {
  const {
    headerList,
    coffeeShopList,
    showEditableButton,
    editHandler,
    deleteHandler
  } = props;

  return (
    <Card className={classes.MiniLists} shadow>
      <h2 className={classes.HeaderList}>{headerList}</h2>
      {coffeeShopList.map(coffeeShop => {
        let ico = defaultIco;
        if (coffeeShop.images) ico = coffeeShop.images[0];

        return (
          <List
            key={coffeeShop.id}
            listImg={ico}
            listName={coffeeShop.name}
            listAddress={coffeeShop.address}
            coffeeShopId={coffeeShop.id}
            toUploadCoffeeShop={() => editHandler(coffeeShop.id)}
            deleteHandler={() => deleteHandler(coffeeShop.id)}
            showEditableButton={showEditableButton}
          />
        );
      })}
    </Card>
  );
};

export default MiniLists;
