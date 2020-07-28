import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TextForm from '../../../components/UI/TextForm/TextForm';
import UploadButton from '../../../components/UI/Button/UploadButton/UploadButton';
import ProfileCard from '../../../components/UI/Card/ProfileCard/ProfileCard';
import ProfileImg from '../../../assets/logo/defaultProfile.png';
import classes from './EditProfile.module.css';
import { BtnMedium, BtnSmall } from '../../../components/UI/Button/Button';
import uploadImage from '../../../store/firebase/uploadImage';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';
import Spinner from '../../../components/UI/Spinner/Spinner';

import * as actions from '../../../store/actions/member';

const EditComponent = ({ cancelEditProfile }) => {
  const dispatch = useDispatch();
  const { name, email, photoUrl, response } = useSelector(
    (state) => state.member
  );

  const [isLoading, setIsLoading] = useState(false);
  const [profPictPreview, setProfPictPreview] = useState(ProfileImg);
  const [edit, setEdit] = useState({
    name: name,
    email: email,
    photoUrl: photoUrl,
    password: '',
  });

  useEffect(() => {
    if (photoUrl) {
      setProfPictPreview(photoUrl);
    }
  }, [photoUrl]);

  useEffect(() => {
    if (response) {
      setIsLoading(false);

      if (response.kind) {
        dispatch(actions.deleteResponse());
        cancelEditProfile();
      }
    }
  }, [response, cancelEditProfile, dispatch]);

  const inputChangeHandler = (type) => (event) => {
    setEdit({ ...edit, [type]: event.target.value });
  };

  const profPictChangeHandler = (event) => {
    const img = event.target.files[0];
    const reference = 'member/images/' + edit.name;

    uploadImage(img, reference)
      .then((response) => {
        setEdit({ ...edit, photoUrl: response });
      })
      .catch((error) => console.log(error));

    let reader = new FileReader();
    reader.onloadend = () => {
      setProfPictPreview(reader.result);
    };
    reader.readAsDataURL(img);
  };

  const submitEditHandler = (event) => {
    event.preventDefault();
    dispatch(actions.editProfile(edit.name, edit.email, edit.photoUrl));
    setIsLoading(true);
  };

  const image = (
    <div className={classes.ImgProfile}>
      <UploadButton
        background={profPictPreview}
        btnType={'Circle'}
        uploadHandler={() => profPictChangeHandler}
        className={classes.EditProfPict}
      >
        <BtnSmall className={classes.BtnSmall}>
          <label htmlFor="uploadImage" className={classes.BtnSmall}>
            Edit
          </label>
        </BtnSmall>
      </UploadButton>
    </div>
  );

  return (
    <ProfileCard image={image}>
      {isLoading ? (
        <Spinner />
      ) : (
        <form className={classes.FormEdit}>
          <div>
            <TextForm
              id="name"
              label="Name"
              className={'textField-3'}
              value={edit.name}
              inputHandler={inputChangeHandler('name')}
            />
            <TextForm
              id="email"
              label="Email"
              className={'textField-3'}
              value={edit.email}
              inputHandler={inputChangeHandler('email')}
            />
          </div>
          {response?.error ? (
            <ErrorMessage message={response.error.message} />
          ) : null}
          <div className={classes.BtnGroup}>
            <BtnMedium btnType="GreenBorder" clicked={cancelEditProfile}>
              Back
            </BtnMedium>
            <BtnMedium btnType="Green" clicked={submitEditHandler}>
              Save
            </BtnMedium>
          </div>
        </form>
      )}
    </ProfileCard>
  );
};

export default EditComponent;
