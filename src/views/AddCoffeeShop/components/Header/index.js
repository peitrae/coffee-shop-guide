import React, { useContext } from "react";

import { FunctionContext } from "../..";
import Card from "../../../../components/UI/Card";
import HeaderImageGroup from "./components/HeaderImageGroup";
import HeaderInputGroup from "./components/HeaderInputGroup";
import geocode from "../../../../utils/geocode";

const Header = ({ header, headerUploading, name, address }) => {
  const {
    handleHeaderChange,
    handleNameChange,
    handleAddressChange,
  } = useContext(FunctionContext);

  const handleOpenMap = async (e) => {
    e.preventDefault();

    if (!address || address === "") {
      return;
    }

    const { lat, long } = await geocode(address);

    const url = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${long}`;
    window.open(url, "_blank");
  };

  return (
    <Card className="header margin-b-16">
      <HeaderImageGroup
        header={header}
        headerUploading={headerUploading}
        handleHeaderChange={handleHeaderChange}
      />
      <HeaderInputGroup
        name={name}
        address={address}
        handleNameChange={handleNameChange}
        handleAddressChange={handleAddressChange}
        handleOpenMap={handleOpenMap}
      />
    </Card>
  );
};

export default Header;
