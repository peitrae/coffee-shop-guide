import React from "react";

import classes from "./MiniList.module.css";
import Card from "../UI/Card/Card";
import Item from "./Item/Item";
import Spinner from "../../components/UI/Spinner/Spinner";

import "./MiniList.scss";

const MiniList = ({ title, list, editHandler, deleteHandler }) => {
  if (list) {
    return (
      <Card className="minilist" shadow>
        <h2 className="minilist-title">{title}</h2>
        {list.map((coffeeShop) => (
          <Item
            key={coffeeShop.id}
            coffeeShop={coffeeShop}
            editHandler={editHandler}
            deleteHandler={deleteHandler}
          />
        ))}
      </Card>
    );
  } else
    return (
      <Card className={[classes.MiniList, classes.Spinner].join(" ")} shadow>
        <Spinner />
      </Card>
    );
};

export default MiniList;
