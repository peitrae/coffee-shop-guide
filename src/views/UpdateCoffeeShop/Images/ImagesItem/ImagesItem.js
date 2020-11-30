import React, { useRef } from "react";

import { Button } from "../../../../components/UI/Button/Button";
import CircularProgress from "../../../../components/Progress/CircularProgress";

import { ReactComponent as CloseIcon } from "../../../../assets/svg/close.svg";

import "./ImagesItem.scss";

const ImagesItem = ({ image, isUploading, onUpload, onDelete }) => {
  const imageInputRef = useRef();

  const onImageClick = () => {
    imageInputRef.current.click();
  };

  return (
    <div className="images-item">
      <input
        type="file"
        accept="image/*"
        className="item-input"
        onChange={onUpload}
        ref={imageInputRef}
      />
      <div className="item-container">
        {isUploading ? null : <CircularProgress />}
        <Button
          size="sm"
          type="text"
          className="delete-button"
          onClick={onDelete}
          icon={CloseIcon}
        />
        <img src={image} alt="Upload" className="item-preview" onClick={onImageClick}/>
      </div>
    </div>
  );
};

export default ImagesItem;
