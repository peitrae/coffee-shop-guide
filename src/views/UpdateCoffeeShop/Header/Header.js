import React, { useState } from "react";

import TextForm from "../../../components/UI/TextForm/TextForm";
import Card from "../../../components//UI/Card/Card";
import { BtnMedium } from "../../../components/UI/Button/Button";
import geocode from "../../../utilities/geocode";

import CursorIcon from "../../../assets/icon/CursorIcon";

import "./Header.scss";

const Header = ({ state, setState }) => {
  const { header, name, address } = state;

  const [headerPreview, setHeaderPreview] = useState(header);

  const headerChangeHandler = (event) => {
    setState({ ...state, header: event.target.files[0] });
    let reader = new FileReader();
    reader.onloadend = () => {
      setHeaderPreview(reader.result);
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  const inputChangeHandler = (type) => (event) => {
    setState({ ...state, [type]: event.target.value });
  };

  const openMapsClickHandler = async (e) => {
    e.preventDefault();

    const { lat, long } = await geocode(address);

    const url = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${long}`;
    window.open(url, "_blank");
  };

  return (
    <Card className="add-coffeeshop-header">
      <div className="header">
        <img
          src={headerPreview}
          alt="Coffee Shop Header"
          className={"header-img"}
        />
        <div className="header-img-edit">
          <label>
            <input
              id="uploadHeader"
              type="file"
              accept="image/*"
              className="edit-input"
              onChange={headerChangeHandler}
            />
            <div>
              <BtnMedium btnType="WhiteBorder">Edit Header</BtnMedium>
            </div>
          </label>
          ;
        </div>
      </div>
      <div className="add-coffeeshop-profile">
        <div className="add-col">
          <label className="add-label">Name</label>
          <TextForm
            id="name"
            label="Name"
            className={"textField-6"}
            value={name}
            inputHandler={inputChangeHandler("name")}
          />
        </div>
        <div className="add-col">
          <label className="add-label">Address</label>
          <TextForm
            id="address"
            label="Address"
            className={"textField-6"}
            value={address}
            inputHandler={inputChangeHandler("address")}
          />
          <button className="open-map" onClick={openMapsClickHandler}>
            <CursorIcon className="open-map-icon" />
          </button>
        </div>
      </div>
    </Card>
  );
};

export default Header;
