import React, { useState, useRef } from "react";

import { Button } from "../../../../../../components/UI/Button";
import {
  DropdownMenu,
  DropdownItem,
} from "../../../../../../components/UI/Dropdown";
import useClickOutside from "../../../../../../hooks/useClickOutside";

const Price = ({ checked, handlePriceItemClick }) => {
  const buttonRef = useRef();
  const menuRef = useRef();

  const prices = {
    1: "< 10K",
    2: "10K - 30K",
    3: "30K - 50K",
    4: "> 50K",
  };

  const [showMenu, setShowMenu] = useState(false);

  const handleShowMenuToggle = () => setShowMenu(!showMenu);

  const handleCloseMenu = (e) => {
    if (e && buttonRef.current.contains(e.target)) {
      return;
    }

    setShowMenu(false);
  };

  const handleItemClick = (price) => {
    handlePriceItemClick(price);
    setShowMenu(false);
  };

  useClickOutside(menuRef, handleCloseMenu);

  return (
    <div className="search-filter__price">
      <Button
        type="outlined"
        size="sm"
        className={`search-filter__btn ${checked ? "search-filter__btn--active" : ""}`}
        onClick={handleShowMenuToggle}
        ref={buttonRef}
      >
        {checked ? prices[checked] : "Price"}
      </Button>
      {showMenu ? (
        <DropdownMenu className="search-filter__menu" ref={menuRef}>
          <DropdownItem
            onClick={() => handleItemClick(1)}
            className={`search-filter__item ${
              checked === 1 ? "search-filter__item--active" : ""
            }`}
          >
            {prices[1]}
          </DropdownItem>
          <DropdownItem
            onClick={() => handleItemClick(2)}
            className={`search-filter__item ${
              checked === 2 ? "search-filter__item--active" : ""
            }`}
          >
            {prices[2]}
          </DropdownItem>
          <DropdownItem
            onClick={() => handleItemClick(3)}
            className={`search-filter__item ${
              checked === 3 ? "search-filter__item--active" : ""
            }`}
          >
            {prices[3]}
          </DropdownItem>
          <DropdownItem
            onClick={() => handleItemClick(4)}
            className={`search-filter__item ${
              checked === 4 ? "search-filter__item--active" : ""
            }`}
          >
            {prices[4]}
          </DropdownItem>
        </DropdownMenu>
      ) : null}
    </div>
  );
};

export default Price;
