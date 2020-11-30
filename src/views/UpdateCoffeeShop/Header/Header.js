import React, { useContext } from "react";

import { FunctionContext } from "../UpdateCoffeeShop";
import Card from "../../../components//UI/Card/Card";
import { Button } from "../../../components/UI/Button/Button";
import InputField from "../../../components/UI/InputField/InputField";
import HeaderImage from "./HeaderImage/HeaderImage";
import geocode from "../../../utilities/geocode";

import CursorIcon from "../../../assets/icon/CursorIcon";

import "./Header.scss";

const Header = ({ header, name, address }) => {
  const { onInputChange } = useContext(FunctionContext);

  const openMapsClickHandler = async (e) => {
    e.preventDefault();

    const { lat, long } = await geocode(address);

    const url = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${long}`;
    window.open(url, "_blank");
  };

  return (
    <Card className="header">
      <HeaderImage image={header} />
      <div className="header-main">
        <div className="header-name">
          <label className="header-label">Name</label>
          <InputField
            value={name}
            onChange={onInputChange("name")}
            size="sm"
            placeholder="Name"
            className="header-input"
          />
        </div>
        <div className="header-address">
          <label className="header-label">Address</label>
          <InputField
            value={address}
            onChange={onInputChange("address")}
            size="sm"
            placeholder="Address"
            className="header-input"
          />
          <Button
            size="sm"
            className="open-map-button"
            onClick={openMapsClickHandler}
            icon={CursorIcon}
          />
        </div>
      </div>
    </Card>
  );
};

export default Header;
