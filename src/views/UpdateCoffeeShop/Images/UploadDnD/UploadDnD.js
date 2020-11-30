import React, { useRef } from "react";

import { Button } from "../../../../components/UI/Button/Button";
import DragAndDrop from "../../../../components/DragAndDrop/DragAndDrop";

import "./UploadDnD.scss";

const UploadDnD = ({ onUpload }) => {
  const inputRef = useRef();

  const onUploadClick = (e) => {
    e.preventDefault();
    inputRef.current.click();
  };

  return (
    <DragAndDrop className="upload-dnd" handleDrop={onUpload}>
      <div className="upload-container">
        <input
          type="file"
          accept="image/*"
          className="item-input"
          onChange={(e) => onUpload(e.target.files)}
          ref={inputRef}
        />
        <Button size="sm" onClick={onUploadClick}>
          Upload
        </Button>
        <span>or</span>
        <span>drag a image here</span>
      </div>
    </DragAndDrop>
  );
};

export default UploadDnD;
