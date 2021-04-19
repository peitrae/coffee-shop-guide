import React from "react";

import InputField from "../../../../../../components/UI/InputField/InputField";
import CursorIcon from "../../../../../../assets/icon/CursorIcon";
import { Button } from "../../../../../../components/UI/Button";

const HeaderInputGroup = ({
  name = "",
  address = "",
  handleNameChange = () => {},
  handleAddressChange = () => {},
  handleOpenMap = () => {},
}) => (
  <div className="header__input-grp">
    <div className="col margin-v-8">
      <label className="add-coffeeshop__label">Name</label>
      <InputField
        value={name}
        onChange={handleNameChange}
        size="sm"
        placeholder="Name"
        className="width-100"
      />
    </div>
    <div className="col margin-v-8">
      <label className="add-coffeeshop__label">Address</label>
      <InputField
        value={address}
        onChange={handleAddressChange}
        size="sm"
        placeholder="Address"
        className="width-100 margin-r-12"
      />
      <Button
        size="md"
        className="header__btn-map"
        onClick={handleOpenMap}
        icon={CursorIcon}
      />
    </div>
  </div>
);

export default HeaderInputGroup;
