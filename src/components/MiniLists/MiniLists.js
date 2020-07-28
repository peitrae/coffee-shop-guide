import React from 'react';

import classes from './MiniLists.module.css';
import Card from '../UI/Card/Card';
import List from './List/List';
import Spinner from '../../components/UI/Spinner/Spinner';
import defaultIco from '../../assets/Starbuck3.png';

const MiniLists = (props) => {
  const {
    headerList,
    coffeeShopList,
    showEditableButton,
    editHandler,
    deleteHandler,
  } = props;

  if (coffeeShopList) {
    return (
      <Card className={classes.MiniLists} shadow>
        <h2 className={classes.HeaderList}>{headerList}</h2>
        {coffeeShopList.map((coffeeShop) => {
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
  } else
    return (
      <Card className={[classes.MiniLists, classes.Spinner].join(' ')} shadow>
        <Spinner />
      </Card>
    );
};

export default MiniLists;
