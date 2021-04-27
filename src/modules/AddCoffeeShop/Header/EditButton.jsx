import React, { useRef } from "react";

import { Button } from "../../../components/UI/Button";
import { ReactComponent as CameraIcon } from "../../../assets/svg/camera.svg";

const EditButton = ({ onChange, className }) => {
  const fileInputRef = useRef();

  const handleEdit = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  return (
    <>
      <input
        type="file"
        accept="image/*"
        onChange={onChange}
        className="input--hide"
        ref={fileInputRef}
      />
      <Button
        icon={CameraIcon}
        size="sm"
        className={className}
        onClick={handleEdit}
      >
        Ganti Header
      </Button>
    </>
  );
};

export default EditButton;
