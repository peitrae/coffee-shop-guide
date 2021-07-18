import React from "react";
import { useSelector } from "react-redux";

import Card from "../../../../components/UI/Card";

const Images = () => {
  const images = useSelector(({ coffeeShop }) => coffeeShop.data.images);

  if (!images) {
    return null;
  }

  return (
    <Card className="images margin-b-16">
      <h2 className="images__title">Gambar</h2>
      <div className="col">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="Pictures"
            className="images__img margin-r-12"
          />
        ))}
      </div>
    </Card>
  );
};

export default Images;
