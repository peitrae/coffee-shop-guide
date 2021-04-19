import React from "react";

import Card from "../UI/Card";
import MiniListItem from "./components/MinilListlItem";
import Spinner from "../UI/Spinner";

const MiniList = ({
  title,
  list,
  loading,
  handleEdit,
  handleDelete,
  handleEditPromo,
  className,
}) => {
  if (loading) {
    return (
      <Card className={`minilist minilist--loading ${className}`} shadow>
        <Spinner className="minilist__spinner" />
      </Card>
    );
  }

  return (
    <Card className={`minilist ${className}`} shadow={true}>
      <h3 className="h3 minilist__title">{title}</h3>
      {list.map((coffeeShop) => (
        <MiniListItem
          key={coffeeShop.id}
          coffeeShop={coffeeShop}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleEditPromo={handleEditPromo}
        />
      ))}
    </Card>
  );
};

export default MiniList;
