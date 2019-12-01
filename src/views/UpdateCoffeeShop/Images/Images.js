import React, { useState } from "react";

import Card from "../../../components//UI/Card/Card";
import UploadButton from "../../../components/UI/Button/UploadButton/UploadButton";
import { BtnClose } from "../../../components/UI/Button/Button";
import uploadPictureIco from "../../../assets/logo/uploadPicture.png";
import CircularProgress from "../../../components/Progress/CircularProgress";
import classes from "./Images.module.css";
import uploadImage from "../../../store/firebase/uploadImage";

const Images = props => {
  const { state, setState, setReadyToSubmit } = props;

  const [preview, setPreview] = useState(state.images);

  const uploadImageHandler = (type, index) => event => {
    const img = event.target.files[0];
    const reference = "coffeeShop/images/" + state.name;

    uploadImage(img, reference)
      .then(response => {
        const tempImages = state.images || [];
        tempImages.push(response);
        setState({ ...state, images: tempImages });
      })
      .catch(error => console.log(error));

    let reader = new FileReader();
    reader.onloadend = () => {
      const tempPreview = [...preview];
      if (type === "edit") {
        tempPreview[index] = reader.result;
      } else {
        tempPreview.push(reader.result);
      }
      setPreview(tempPreview);
    };
    reader.readAsDataURL(img);
  };

  const deleteImageHandler = index => event => {
    event.preventDefault();
    const tempImages = [...state.images];
    tempImages.splice(index, 1);
    setState({ ...state, images: tempImages });
    setPreview(tempImages);
  };

  if (state.images.length === preview.length) {
    setReadyToSubmit(true);
  } else {
    setReadyToSubmit(false);
  }

  return (
    <Card cardType={classes.Card}>
      <h2>Images</h2>
      <div>
        {preview.map((img, index) => (
          <UploadButton
            key={index}
            handler={() => uploadImageHandler("edit", index)}
            uploadType="NoBorder"
          >
            {state.images[index] ? null : <CircularProgress />}
            <BtnClose
              btnName="X"
              classes={classes.BtnClose}
              clicked={deleteImageHandler(index)}
            />
            <img src={img} alt="Upload" className={classes.ImgPreview} />
          </UploadButton>
        ))}
        {preview.length < 4 ? (
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
