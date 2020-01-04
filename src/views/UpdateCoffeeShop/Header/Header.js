import React, { useState } from "react";

import TextForm from "../../../components/UI/TextForm/TextForm";
import Card from "../../../components//UI/Card/Card";
import classes from "./Header.module.css";
import { BtnMedium } from "../../../components/UI/Button/Button";

const Header = props => {
  const { state, setState } = props;
  const { header, name, address } = state;

  const [headerPreview, setHeaderPreview] = useState(header);

  const headerChangeHandler = event => {
    setState({ ...state, header: event.target.files[0] });
    let reader = new FileReader();
    reader.onloadend = () => {
      setHeaderPreview(reader.result);
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  const inputChangeHandler = type => event => {
    setState({ ...state, [type]: event.target.value });
  };

  return (
    <Card className={classes.Card}>
      <div>
        <img
          src={headerPreview}
          alt="Coffee Shop Header"
          className={classes.ImgHeader}
        />
        <div className={classes.EditHeader}>
          <label className={classes.EditLabel}>
            <input
              id="uploadHeader"
              type="file"
              name={props.imageId}
              accept="image/*"
              className={classes.FileInput}
              onChange={headerChangeHandler}
            />
            <div>
              <BtnMedium btnType="WhiteBorder">Edit Header</BtnMedium>
            </div>
          </label>
          ;
        </div>
      </div>
      <div className={classes.Desc}>
        <div>
          <table>
            <tbody>
              <tr>
                <th>Name</th>
                <td>
                  <TextForm
                    id="name"
                    label="Name"
                    className={"textField-6"}
                    value={name}
                    inputHandler={inputChangeHandler("name")}
                  />
                </td>
              </tr>
              <tr>
                <th>Address</th>
                <td>
                  <TextForm
                    id="address"
                    label="Address"
                    className={"textField-6"}
                    value={address}
                    inputHandler={inputChangeHandler("address")}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
};

export default Header;
