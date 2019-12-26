import React from "react";
import classes from "./UploadImage.module.css";

const UploadImage = props => {
  return (
    <div className={props.className}>
      <input
        id="uploadImage"
        type="file"
        accept="image/*"
        className={classes.FileInput}
        onChange={props.uploadHandler()}
      />
      <label for="uploadImage" class={classes.Label}>
        {props.children}
      </label>
    </div>
  );
};

export default UploadImage;
