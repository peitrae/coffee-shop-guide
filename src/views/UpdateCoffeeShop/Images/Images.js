import React, { useState } from "react";

import Card from "../../../components//UI/Card/Card";
import uploadPictureIco from "../../../assets/logo/uploadPicture.png";
import CircularProgress from "../../../components/Progress/CircularProgress";
import classes from "./Images.module.css";
import uploadImage from "../../../store/firebase/uploadImage";
import { CloseButtonWhite } from "../../../components/UI/Button/CloseButton/CloseButton";
import UploadImage from "../../../components/UI/Button/UploadImage/UploadImage";

const Images = props => {
  const { images, coffeeShopName, setImage, setReadyToSubmit } = props;

  const tempImages = images
  const [preview, setPreview] = useState(tempImages);

  console.log(images)

  const uploadImageHandler = (edit, index) => event => {
    const img = event.target.files[0];
    const reference = "coffeeShop/images/" + coffeeShopName;

    uploadImage(img, reference)
      .then(response => {
        tempImages.push(response);
        setImage(tempImages);
      })
      .catch(error => console.log(error));

    let reader = new FileReader();
    reader.onloadend = () => {
      const tempPreview = [...preview];
      edit
        ? (tempPreview[index] = reader.result)
        : tempPreview.push(reader.result);
      setPreview(tempPreview);
    };
    reader.readAsDataURL(img);
  };

  const deleteImageHandler = index => event => {
    event.preventDefault();
    const tempImages = [...images];
    tempImages.splice(index, 1);
    tempImages(tempImages);
    setPreview(tempImages);
  };

  if (images.length === preview.length) {
    setReadyToSubmit(true);
  } else {
    setReadyToSubmit(false);
  }

  return (
    <Card cardType={classes.Card}>
      <h2>Images</h2>
      <div className={classes.Images}>
        {preview.map((img, index) => (
          <UploadImage
            key={index}
            uploadHandler={() => uploadImageHandler(index)}
          >
            <div className={classes.BtnUpload}>
              {images[index] ? null : <CircularProgress />}
              <CloseButtonWhite
                className={classes.Close}
                clicked={deleteImageHandler(index)}
              />
              <img src={img} alt="Upload" className={classes.ImgPreview} />
            </div>
          </UploadImage>
        ))}
        {preview.length < 4 ? (
          <UploadImage uploadHandler={uploadImageHandler}>
            <div className={[classes.BtnUpload, classes.Border].join(" ")}>
              <img
                src={uploadPictureIco}
                alt="Upload"
                className={classes.UploadIco}
              />
              <span className={classes.UploadDesc}>Upload Image</span>
            </div>
          </UploadImage>
        ) : null}
      </div>
    </Card>
  );
};

export default Images;
