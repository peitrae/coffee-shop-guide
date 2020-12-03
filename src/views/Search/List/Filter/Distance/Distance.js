import React, { useState, useRef } from "react";

import { Button } from "../../../../../components/UI/Button/Button";
import {
  DropdownMenu,
  DropdownItem,
} from "../../../../../components/UI/Dropdown/Dropdown";
import useClickOutside from "../../../../../hooks/useClickOutside";

import "./Distance.scss";

const Distance = ({ checked, onClickDistance }) => {
  const buttonRef = useRef();
  const menuRef = useRef();

  const [showMenu, setShowMenu] = useState(false);

  const distanceOptions = {
    1000: "1 Km",
    5000: "5 Km",
    10000: "10 Km",
  };

  const onShowDropdown = () => setShowMenu(!showMenu);

  const onCloseDropdown = (e) => {
    if (e && buttonRef.current.contains(e.target)) {
      return;
    }

    setShowMenu(false);
  };

  const onClickItem = (distance) => {
    onClickDistance(distance);
    setShowMenu(false);
  };

  const checkedStyle = (distance) => {
    if (checked === distance) {
      return "checked";
    }

    return "";
  };

  useClickOutside(menuRef, onCloseDropdown);

  return (
    <div className="search-filter-distance">
      <Button
        type="text"
        size="sm"
        className={`search-filter-button ${checked ? "checked" : ""}`}
        onClick={onShowDropdown}
        ref={buttonRef}
      >
        {checked ? distanceOptions[checked] : "Distance"}
      </Button>
      {showMenu ? (
        <DropdownMenu className="distance-dropdown" ref={menuRef}>
          <DropdownItem
            onClick={() => onClickItem(1000)}
            className={`distance-item ${checkedStyle(1000)}`}
            id="one-kilo"
          >
            {distanceOptions[1000]}
          </DropdownItem>
          <DropdownItem
            onClick={() => onClickItem(5000)}
            className={`distance-item ${checkedStyle(5000)}`}
            id="five-kilo"
          >
            {distanceOptions[5000]}
          </DropdownItem>
          <DropdownItem
            onClick={() => onClickItem(10000)}
            className={`distance-item ${checkedStyle(10000)}`}
            id="ten-kilo"
          >
            {distanceOptions[10000]}
          </DropdownItem>
        </DropdownMenu>
      ) : null}
    </div>
  );
};

export default Distance;
