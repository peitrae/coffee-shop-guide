import React from "react";

import classes from "./UploadButton.module.css";

const UploadButton = props => {
  const uploadButton = [classes.UploadButton, [props.className]].join(" ");
  const btnType = [classes.Img, classes[props.btnType]].join(" ")

  return (
    <React.Fragment>
      <img
        src={props.background}
        alt={"Preview"}
        className={btnType}
      />
      <div className={uploadButton}>
        <input
          id="uploadImage"
          type="file"
          accept="image/*"
          className={classes.FileInput}
          onChange={props.uploadHandler()}
        />
        <label className={classes.Label}>{props.children}</label>
      </div>
    </React.Fragment>
  );
};

export default UploadButton;
