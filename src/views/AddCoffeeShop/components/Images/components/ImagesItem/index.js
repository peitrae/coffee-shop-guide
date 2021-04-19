import React, { useRef } from "react";

import Backdrop from "../../../../../../components/UI/Backdrop";
import Spinner from "../../../../../../components/UI/Spinner";
import { CloseCircleButton } from "../../../../../../components/UI/Button";

const ImagesItem = ({ image, isUploading, handleUpload, handleDelete }) => {
  const imageInputRef = useRef();

  const handleClickImage = () => {
    imageInputRef.current.click();
  };

  return (
    <>
      <input
        type="file"
        accept="image/*"
        className="input--hide"
        onChange={handleUpload}
        ref={imageInputRef}
      />
      <div className="images__item margin-r-12">
        {isUploading ? null : (
          <Backdrop>
            <Spinner color="white" />
          </Backdrop>
        )}
        <CloseCircleButton
          onClick={handleDelete}
          className="images__btn-delete"
        />
        <img
          src={image}
          alt="Upload"
          className="images__preview"
          onClick={handleClickImage}
        />
      </div>
    </>
  );
};

export default ImagesItem;
