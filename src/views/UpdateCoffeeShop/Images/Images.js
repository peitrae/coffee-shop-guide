import React, { useState, useEffect, useContext } from "react";

import { FunctionContext } from "../UpdateCoffeeShop";
import Card from "../../../components/UI/Card/Card";
import ImagesItem from "./ImagesItem/ImagesItem";
import UploadDnD from "./UploadDnD/UploadDnD";
import uploadImage from "../../../store/firebase/uploadImage";

import "./Images.scss";

const Images = ({ images = [], coffeeShopName }) => {
  const { onSetImage, setUploading } = useContext(FunctionContext);

  const [preview, setPreview] = useState([]);

  useEffect(() => {
    setPreview(images);
  }, [images]);

  const onUploadImage = (files, index) => {
    const img = files[0];
    const reference = "coffeeShop/images/" + coffeeShopName;
    setUploading(true);

    uploadImage(img, reference)
      .then((response) => {
        const tempImages = [...images];
        tempImages.push(response);
        onSetImage(tempImages);
        setUploading(false);
      })
      .catch((error) => console.log(error));

    let reader = new FileReader();
    reader.onloadend = () => {
      const tempPreview = [...preview];
      index
        ? (tempPreview[index] = reader.result)
        : tempPreview.push(reader.result);
      setPreview(tempPreview);
    };
    reader.readAsDataURL(img);
  };

  const onDeleteImage = (index) => (e) => {
    e.preventDefault();
    const temp = [...images];
    temp.splice(index, 1);
    onSetImage(temp);
    setPreview(temp);
  };

  return (
    <Card className="images">
      <h2>Images</h2>
      <div className="images-container">
        {preview.map((img, index) => (
          <ImagesItem
            key={index}
            image={img}
            isUploading={images[index]}
            onUpload={(e) => onUploadImage(e.target.files, index)}
            onDelete={onDeleteImage(index)}
          />
        ))}
        {preview.length < 4 ? <UploadDnD onUpload={onUploadImage} /> : null}
      </div>
    </Card>
  );
};

export default Images;
