import React from "react";
import { useSelector } from "react-redux";

import classes from "./Picture.module.css";
import Card from "../../../components/UI/Card/Card";
import Spinner from "../../../components/UI/Spinner/Spinner";

const Images = () => {
  const images = useSelector(state => state.coffeeShop.data.images);

  if (!images) {
    return null
  }

  return (
    <Card cardType={classes.Picture}>
      <h2 className={classes.HeaderText}>Images</h2>
      <div className={classes.PictureLists}>
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="Pictures"
            className={classes.ImgList}
          />
        ))}
      </div>
    </Card>
  );
};

export default Images;
