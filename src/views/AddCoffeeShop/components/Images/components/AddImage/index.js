import React, { useRef } from "react";

import { Button } from "../../../../../../components/UI/Button";

const AddImage = ({ handleUpload }) => {
  const inputRef = useRef();

  const handleClickButton = (e) => {
    e.preventDefault();
    inputRef.current.click();
  };

  return (
    <>
      <input
        type="file"
        accept="image/*"
        className="input--hide"
        onChange={(e) => handleUpload(e.target.files)}
        ref={inputRef}
      />
      <div className="images__add">
        <Button size="sm" onClick={handleClickButton}>
          Upload
        </Button>
      </div>
    </>
  );
};

export default AddImage;
