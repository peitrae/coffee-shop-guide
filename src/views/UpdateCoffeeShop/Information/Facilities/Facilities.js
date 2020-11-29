import React, { useState } from "react";

import { Button } from "../../../../components/UI/Button/Button";
import FacilitiesDropdown from "./FacilitiesDropdown/FacilitiesDropdown";
import FacilitiesItem from "./FacilitiesItem/FacilitiesItem";

import { ReactComponent as PlusIcon } from "../../../../assets/svg/plus.svg";

import "./Facilities.scss";

const Facilities = ({ facilities, onSubmit, onDelete }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const showDropdownHandler = (e) => {
    e && e.preventDefault();
    setShowDropdown(!showDropdown);
  };

  const submitClickHandler = (facility) => (e) => {
    e.preventDefault();
    onSubmit(facility);
    setShowDropdown(false);
  };

  return (
    <div className="facilities">
      <label className="information-label">Facilities</label>
      <div clasName="facilities-container">
        <div className="facilities-list">
          {facilities.map((facility, index) => (
            <FacilitiesItem onDelete={onDelete(index)}>
              {facility}
            </FacilitiesItem>
          ))}
        </div>
        <div className="facilities-add">
          <FacilitiesDropdown
            facilities={facilities}
            show={showDropdown}
            onSubmit={submitClickHandler}
            onClose={showDropdownHandler}
          />

          <Button
            size="sm"
            type="text"
            className="add-button"
            onClick={showDropdownHandler}
            icon={PlusIcon}
          >
            Add facility
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Facilities;
