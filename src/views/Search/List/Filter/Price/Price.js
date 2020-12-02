import React, { useState, useRef } from "react";

import { Button } from "../../../../../components/UI/Button/Button";
import {
  DropdownMenu,
  DropdownItem,
} from "../../../../../components/UI/Dropdown/Dropdown";
import useClickOutside from "../../../../../hooks/useClickOutside";

import "./Price.scss";

const Price = ({ checked, onClickPrice }) => {
  const buttonRef = useRef();
  const menuRef = useRef();

  const prices = {
    1: "< 10K",
    2: "10K - 30K",
    3: "30K - 50K",
    4: "> 50K",
  };

  const [showMenu, setShowMenu] = useState(false);

  const onClickShowPrice = () => setShowMenu(!showMenu);

  const onCloseDropdown = (e) => {
    if (e && buttonRef.current.contains(e.target)) {
      return;
    }

    setShowMenu(false);
  };

  const onClickItem = (price) => {
    onClickPrice(price);
    setShowMenu(false);
  };

  const checkedStyle = (price) => {
    if (checked === price) {
      return "checked";
    }

    return "";
  };

  useClickOutside(menuRef, onCloseDropdown);

  return (
    <div className="search-filter-price">
      <Button
        type="text"
        size="sm"
        className={`search-filter-button ${checked ? "checked" : ""}`}
        onClick={onClickShowPrice}
        ref={buttonRef}
      >
        {checked ? prices[checked] : "Price"}
      </Button>
      {showMenu ? (
        <DropdownMenu className="price-dropdown" ref={menuRef}>
          <DropdownItem
            onClick={() => onClickItem(1)}
            className={`price-item ${checkedStyle(1)}`}
            id="below-ten"
          >
            {prices[1]}
          </DropdownItem>
          <DropdownItem
            onClick={() => onClickItem(2)}
            className={`price-item ${checkedStyle(2)}`}
            id="ten-thirty"
          >
            {prices[2]}
          </DropdownItem>
          <DropdownItem
            onClick={() => onClickItem(3)}
            className={`price-item ${checkedStyle(3)}`}
            id="thirty-fifty"
          >
            {prices[3]}
          </DropdownItem>
          <DropdownItem
            onClick={() => onClickItem(4)}
            className={`price-item ${checkedStyle(4)}`}
            id="above-fifty"
          >
            {prices[4]}
          </DropdownItem>
        </DropdownMenu>
      ) : null}
    </div>
  );
};

export default Price;
