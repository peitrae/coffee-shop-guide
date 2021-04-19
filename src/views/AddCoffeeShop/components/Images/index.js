import React, { useState, useEffect, useContext } from "react";

import { FunctionContext } from "../..";
import Card from "../../../../components/UI/Card";
import ImagesItem from "./components/ImagesItem";
import AddImage from "./components/AddImage";
import uploadImage from "../../../../store/firebase/uploadImage";

const Images = ({ images = [], coffeeShopId }) => {
  const { handleSetImages, setImageUploading } = useContext(FunctionContext);

  const [preview, setPreview] = useState([]);

  useEffect(() => {
    setPreview(images);
  }, [images]);

  const handleUploadImage = (files, index) => {
    const img = files[0];
    const reference = `coffeeShop/images/${coffeeShopId}/`;
    setImageUploading(true);

    uploadImage(img, reference)
      .then((response) => {
        const tempImages = [...images];
        tempImages.push(response);
        handleSetImages(tempImages);
        setImageUploading(false);
      })
      .catch((error) => console.log(error));

    let reader = new FileReader();
    reader.onloadend = () => {
      const tempPreview = [...preview];

      if (index) {
        tempPreview[index] = reader.result;
      } else {
        tempPreview.push(reader.result);
      }
      setPreview(tempPreview);
    };

    reader.readAsDataURL(img);
  };

  const handleDeleteImage = (index) => (e) => {
    e.preventDefault();
    const temp = [...images];
    temp.splice(index, 1);
    handleSetImages(temp);
    setPreview(temp);
  };

  return (
    <Card className="images margin-b-16">
      <h2 className="add-coffeeshop__title">Images</h2>
      <div className="col">
        {preview.map((img, index) => (
          <ImagesItem
            key={index}
            image={img}
            isUploading={images[index]}
            handleUpload={(e) => handleUploadImage(e.target.files, index)}
            handleDelete={handleDeleteImage(index)}
          />
        ))}
        {preview.length < 4 ? (
          <AddImage handleUpload={handleUploadImage} />
        ) : null}
      </div>
    </Card>
  );
};

export default Images;
