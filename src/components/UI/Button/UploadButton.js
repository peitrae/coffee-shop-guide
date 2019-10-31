import React from "react";

import classes from "./UploadButton.module.css";

const UploadButton = props => {
  const uploadButton = [classes.UploadButton, classes[props.uploadType]].join(
    " "
  );

  return (
    <label className={uploadButton}>
      <input
        id="uploadImage"
        type="file"
        accept="image/*"
        className={classes.FileInput}
        onChange={props.handler()}
      />
      <div className={classes.Label}>{props.children}</div>
    </label>
  );
};

export default UploadButton;
