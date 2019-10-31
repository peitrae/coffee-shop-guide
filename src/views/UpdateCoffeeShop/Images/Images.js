import React, { useState } from "react";
import { useSelector } from "react-redux";

import Card from "../../../components//UI/Card/Card";
import UploadButton from "../../../components/UI/Button/UploadButton";
import { BtnClose } from "../../../components/UI/Button/Button";
import uploadPictureIco from "../../../assets/logo/uploadPicture.png";
import classes from "./Images.module.css";
import uploadImage from "../../../store/firebase/uploadImage";

const Images = props => {
  const { state, setState } = props;

  let coffeeShopData = useSelector(state => state.coffeeShop.data);
  let images = []

  if(coffeeShopData) images = coffeeShopData.images || []

  const [imagesPreview, setImagesPreview] = useState(images);

  const uploadImageHandler = (type, index) => event => {
    const img = event.target.files[0];
    const metadata = img.type;
    const reference = "coffeeShop/images/" + state.name;

    uploadImage(img, metadata, reference)
      .then(response => {
        const tempImages = state.images || [];
        tempImages.push(response);
        setState({ ...state, images: tempImages });
      })
      .catch(error => console.log(error));

    let reader = new FileReader();
    reader.onloadend = () => {
      const tempPreview = [...imagesPreview];
      if (type === "edit") {
        tempPreview[index] = reader.result;
      } else {
        tempPreview.push(reader.result);
      }
      setImagesPreview(tempPreview);
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  const deleteImageHandler = index => event => {
    event.preventDefault()
    const tempImages = [...state.images];
    tempImages.splice(index, 1)
    setState({ ...state, images: tempImages });
    setImagesPreview(tempImages);
  }

  console.log(state)

  return (
    <Card cardType={classes.Card}>
      <h2>Images</h2>
      <div>
        {imagesPreview.map((img, index) => (
          <UploadButton
            key={index}
            handler={() => uploadImageHandler("edit", index)}
            uploadType="NoBorder"
          >
            <BtnClose btnName="X" classes={classes.BtnClose} clicked={deleteImageHandler(index)}/>
            <img
              src={img}
              alt="Upload"
              className={classes.ImgPreview}
            />
          </UploadButton>
        ))}
        {imagesPreview.length < 4 ? (
          <React.Fragment>
            <UploadButton handler={() => uploadImageHandler()}>
              <img
                src={uploadPictureIco}
                alt="Upload"
                className={classes.UploadIco}
              />
              <span className={classes.UploadDesc}>Upload Picture</span>
            </UploadButton>
          </React.Fragment>
        ) : null}
      </div>
    </Card>
  );
};

export default Images;
