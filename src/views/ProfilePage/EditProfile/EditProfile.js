import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

import classesStyle from './EditProfile.module.css';
import { BtnMedium} from "../../../components/UI/Button/Button";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300
  },
  dense: {
    marginTop: 14
  },
  menu: {
    width: 200
  }
}));

const EditComponent = props => {
  const classes = useStyles();

  const [edit, setEdit] = useState({
    name: "",
    email: "",
    password: ""
  });

  const inputChangeHandler = type => event => {
    setEdit({ ...edit, [type]: event.target.value });
  };

  return (
    <form className={classesStyle.FormEdit}>
      {props.editType ? (
        <div>
          <TextField
            id="name"
            label="Name"
            className={classes.textField}
            value={edit.name}
            onChange={inputChangeHandler("name")}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="email"
            label="Email"
            className={classes.textField}
            value={edit.email}
            onChange={inputChangeHandler("email")}
            margin="normal"
            variant="outlined"
          />
        </div>
      ) : (
        <div>
        <TextField
          id="password"
          label="New Password"
          className={classes.textField}
          onChange={inputChangeHandler("password")}
          type="password"
          autoComplete="current-password"
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="password"
          label="Confirm New Password"
          className={classes.textField}
          onChange={inputChangeHandler("password")}
          type="password"
          autoComplete="current-password"
          margin="normal"
          variant="outlined"
        />
        </div> 
      )}
      <div className={classesStyle.Btn}>
        <BtnMedium btnName="Kembali" btnType="GreenBorder" clicked={props.btnBack}/>
        <BtnMedium btnName="Simpan" btnType="Green" />
      </div>
    </form>
  );
};

export default EditComponent;
