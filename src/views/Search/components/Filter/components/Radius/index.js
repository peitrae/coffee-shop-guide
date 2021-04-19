import React, { useState, useRef } from "react";

import { Button } from "../../../../../../components/UI/Button";
import {
  DropdownMenu,
  DropdownItem,
} from "../../../../../../components/UI/Dropdown";
import useClickOutside from "../../../../../../hooks/useClickOutside";

const Radius = ({ checked, handleRadiusItemClick }) => {
  const buttonRef = useRef();
  const menuRef = useRef();

  const [showMenu, setShowMenu] = useState(false);

  const distanceOptions = {
    1000: "1 Km",
    5000: "5 Km",
    10000: "10 Km",
  };

  const handleShowMenu = () => setShowMenu(!showMenu);

  const handleCloseMenu = (e) => {
    if (e && buttonRef.current.contains(e.target)) {
      return;
    }

    setShowMenu(false);
  };

  const handleItemClick = (distance) => {
    handleRadiusItemClick(distance);
    setShowMenu(false);
  };

  useClickOutside(menuRef, handleCloseMenu);

  return (
    <div className="search-filter__distance">
      <Button
        type="outlined"
        size="sm"
        className={`search-filter__btn ${
          checked ? "search-filter__btn--active" : ""
        }`}
        onClick={handleShowMenu}
        ref={buttonRef}
      >
        {checked ? distanceOptions[checked] : "Radius"}
      </Button>
      {showMenu ? (
        <DropdownMenu
          className="search-filter__menu search-filter__menu--right"
          ref={menuRef}
        >
          <DropdownItem
            onClick={() => handleItemClick(1000)}
            className={`search-filter__item ${
              checked === 1000 ? "search-filter__item--active" : ""
            }`}
          >
            {distanceOptions[1000]}
          </DropdownItem>
          <DropdownItem
            onClick={() => handleItemClick(5000)}
            className={`search-filter__item ${
              checked === 5000 ? "search-filter__item--active" : ""
            }`}
          >
            {distanceOptions[5000]}
          </DropdownItem>
          <DropdownItem
            onClick={() => handleItemClick(10000)}
            className={`search-filter__item ${
              checked === 10000 ? "search-filter__item--active" : ""
            }`}
          >
            {distanceOptions[10000]}
          </DropdownItem>
        </DropdownMenu>
      ) : null}
    </div>
  );
};

export default Radius;
