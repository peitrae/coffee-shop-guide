import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import InputField from "../../../../components/UI/InputField/InputField";
import { Button } from "../../../../components/UI/Button";
import ErrorMessage from "../../../../components/ErrorMessage";
import Spinner from "../../../../components/UI/Spinner";
import Card from "../../../../components/UI/Card";
import uploadImage from "../../../../store/firebase/uploadImage";
import defaultImg from "../../../../assets/logo/defaultProfile.png";
import EditImage from "./components/EditImage";
import * as actions from "../../../../store/actions/member";

const EditProfile = ({ handleClose, profile }) => {
  const dispatch = useDispatch();
  const { name, email, photoUrl } = profile;
  const response = useSelector(({ member }) => member.response);

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(photoUrl || defaultImg);
  const [imageUploading, setImageUploading] = useState(false);
  const [edit, setEdit] = useState({ name, email, photoUrl });

  useEffect(() => {
    if (response) {
      setLoading(false);

      if (response.kind) {
        dispatch(actions.deleteResponse());
        handleClose();
      }
    }
  }, [response, handleClose, dispatch]);

  const handleChangeInput = (type) => (event) => {
    setEdit({ ...edit, [type]: event.target.value });
  };

  const handleChangeImage = (event) => {
    const img = event.target.files[0];
    const reference = "member/images/" + edit.name;
    setImageUploading(true);

    uploadImage(img, reference)
      .then((response) => {
        setEdit({ ...edit, photoUrl: response });
        setImageUploading(false);
      })
      .catch((error) => console.log(error));

    let reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(img);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(actions.editProfile(edit.name, edit.email, edit.photoUrl));
    setLoading(true);
  };

  return (
    <Card className="profile profile-edit" shadow={true}>
      <div className="profile__header">
        <EditImage
          value={image}
          uploading={imageUploading}
          handleChange={handleChangeImage}
        />
      </div>
      <div className="profile__body">
        {loading ? (
          <Spinner />
        ) : (
          <>
            {response?.error && (
              <ErrorMessage className="profile-edit__error">
                {response.error.message}
              </ErrorMessage>
            )}
            <form className="profile-edit__form">
              <InputField
                value={edit.name}
                onChange={handleChangeInput("name")}
                placeholder="Nama"
                className="profile-edit__input margin-b-12"
              />
              <InputField
                value={edit.email}
                onChange={handleChangeInput("email")}
                placeholder="Email"
                className="profile-edit__input"
              />
            </form>
            <div className="profile-edit__actions">
              <Button
                type="outlined"
                className="profile-edit__btn margin-r-12"
                onClick={handleClose}
              >
                Kembali
              </Button>
              <Button
                onClick={handleSubmit}
                className="profile-edit__btn"
                disabled={imageUploading}
              >
                Simpan
              </Button>
            </div>
          </>
        )}
      </div>
    </Card>
  );
};

export default EditProfile;
