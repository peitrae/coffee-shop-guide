import React, { useRef, useContext } from "react";

import { Button } from "../../../../components/UI/Button/Button";
import { FunctionContext } from "../../UpdateCoffeeShop"

import { ReactComponent as CameraIcon } from "../../../../assets/svg/camera.svg";
import "./HeaderImage.scss";

const HeaderImage = ({ image }) => {
  const fileInputRef = useRef();
  const { onHeaderChange } = useContext(FunctionContext);

  const onEditClick = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  } 

  return (
    <div className="header-img">
      <img src={image} alt="Coffee Shop Header" />
      <div className="header-img-container">
        <input
          id="header-input-image"
          type="file"
          accept="image/*"
          onChange={onHeaderChange}
          ref={fileInputRef}
        />
        <Button
          icon={CameraIcon}
          color="secondary"
          size="sm"
          className="change-button"
          onClick={onEditClick}
        >
          Edit Header
        </Button>
      </div>
    </div>
  );
};

export default HeaderImage;
