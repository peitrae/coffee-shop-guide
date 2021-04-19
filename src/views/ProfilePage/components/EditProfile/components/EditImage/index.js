import React from "react";
import Backdrop from "../../../../../../components/UI/Backdrop";

import Spinner from "../../../../../../components/UI/Spinner";

const EditImage = ({ value, uploading, handleChange }) => (
  <div className="edit-image">
    <img src={value} alt="preview" className="profile__image" />
    <Backdrop
      className={`edit-image__backdrop ${
        !uploading ? "edit-image__backdrop--only-show-hover" : ""
      }`}
    >
      {uploading ? (
        <Spinner color="white" />
      ) : (
        <>
          <input
            id="image__input"
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="input--hide"
          />
          <button className="edit-image__btn">
            <label className="edit-image__label" htmlFor="image__input">
              Edit
            </label>
          </button>
        </>
      )}
    </Backdrop>
  </div>
);

export default EditImage;
