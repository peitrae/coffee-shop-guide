import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";

import { BtnMedium, BtnSmall } from "../../../components/UI/Button/Button";
import ProfileImg from "../../../assets/logo/defaultProfile.png";
import classes from "./EditProfile.module.css";
import uploadImage from "../../../store/firebase/uploadImage";
import * as actions from "../../../store/actions/member";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300
  }
}));

const EditComponent = props => {
  const { editType, backToProfile } = props;

  const [profPictPreview, setProfPictPreview] = useState(ProfileImg);

  const getUserData = useSelector(state => state.member);
  const { name, email, photoURL } = getUserData;

  const dispatch = useDispatch();
  const editProfile = (name, email, photoURL) =>
    dispatch(actions.editProfile(name, email, photoURL));
  const editPassword = password => dispatch(actions.editPassword(password));

  const [edit, setEdit] = useState({
    name: name,
    email: email,
    password: "",
    confirmPassword: "",
    photoURL: photoURL
  });

  if(photoURL && profPictPreview === ProfileImg) setProfPictPreview(photoURL)

  const classesMaterial = useStyles();

  const inputChangeHandler = type => event => {
    setEdit({ ...edit, [type]: event.target.value });
  };

  const profPictChangeHandler = event => {
    const img = event.target.files[0];
    const metadata = img.type;
    const reference = "member/images/" + edit.name;

    uploadImage(img, metadata, reference)
      .then(response => {
        setEdit({...edit, photoURL: response});
      })
      .catch(error => console.log(error));


    let reader = new FileReader();
    reader.onloadend = () => {
      setProfPictPreview(reader.result);
    };
    reader.readAsDataURL(img);
  };

  const submitEditHandler = event => {
    event.preventDefault();
    editType ? editProfile(edit.name, edit.email, edit.photoURL) : editPassword(edit.password);
    backToProfile();
  };

  let content = (
    <div>
      <TextField
        id="password"
        label="New Password"
        className={classesMaterial.textField}
        onChange={inputChangeHandler("password")}
        type="password"
        autoComplete="current-password"
        margin="normal"
        variant="outlined"
      />
      <TextField
        id="password"
        label="Confirm New Password"
        className={classesMaterial.textField}
        onChange={inputChangeHandler("confirmPassword")}
        type="password"
        autoComplete="current-password"
        margin="normal"
        variant="outlined"
      />
    </div>
  ); // Default Edit Password

  if (editType) {
    content = (
      <div>
        <TextField
          id="name"
          label="Name"
          className={classesMaterial.textField}
          value={edit.name}
          onChange={inputChangeHandler("name")}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="email"
          label="Email"
          className={classesMaterial.textField}
          value={edit.email}
          onChange={inputChangeHandler("email")}
          margin="normal"
          variant="outlined"
        />
      </div>
    );
  }

  return (
    <React.Fragment>
      <img src={profPictPreview} alt={"Preview"} className={classes.ProfPict} />
      <div className={classes.ProfPict}>
        <div className={classes.EditProfPict}>
          <input
            id="uploadHeader"
            type="file"
            name={props.imageId}
            accept="image/*"
            className={classes.FileInput}
            onChange={profPictChangeHandler}
          />
          <label>
            <BtnSmall btnName="Upload" className={classes.ButtonSmall} />
          </label>
        </div>
      </div>
      <form className={classes.FormEdit}>
        {content}
        <div className={classes.Btn}>
          <BtnMedium
            btnName="Kembali"
            btnType="GreenBorder"
            clicked={props.backToProfile}
          />
          <BtnMedium
            btnName="Simpan"
            btnType="Green"
            clicked={submitEditHandler}
          />
        </div>
      </form>
    </React.Fragment>
  );
};

export default EditComponent;
