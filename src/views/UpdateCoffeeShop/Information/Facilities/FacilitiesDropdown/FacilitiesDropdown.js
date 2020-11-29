import React, { useState, useRef } from "react";

import { Button } from "../../../../../components/UI/Button/Button";
import {
  DropdownMenu,
  DropdownItem,
} from "../../../../../components/UI/Dropdown/Dropdown";
import useClickOutside from "../../../../../hooks/useClickOutside";

import { ReactComponent as WifiIcon } from "../../../../../assets/svg/wifi.svg";
import { ReactComponent as PaymentIcon } from "../../../../../assets/svg/payment.svg";
import { ReactComponent as RightArrowIcon } from "../../../../../assets/svg/right-arrow.svg";

import "./FacilitiesDropdown.scss";

const FacilitiesDropdown = ({ facilities, show, onClose, onSubmit }) => {
  const dropdownRef = useRef();

  const [activeMenu, setActiveMenu] = useState("main"); // payment
  const [facility, setFacility] = useState("");

  useClickOutside(dropdownRef, onClose);

  if (!show) {
    return null;
  }

  const paymentClickHandler = (e) => {
    e.preventDefault();
    setActiveMenu("payment");
  };

  const backClickHandler = (e) => {
    e.preventDefault();
    setActiveMenu("main");
  };

  const inputChangeHandler = (e) => setFacility(e.target.value);

  return (
    <DropdownMenu className="facilities-dropdown-menu" ref={dropdownRef}>
      {activeMenu === "main" ? (
        <div className="dropdown-item-container">
          {facilities.includes("Wifi") ? null : (
            <DropdownItem
              leftIcon={<WifiIcon />}
              className="dropdown-item"
              onClick={onSubmit("Wifi")}
            >
              Wifi
            </DropdownItem>
          )}
          <DropdownItem
            leftIcon={<PaymentIcon />}
            rightIcon={<RightArrowIcon />}
            className="dropdown-item"
            onClick={paymentClickHandler}
          >
            Payment
          </DropdownItem>
          <hr className="dropdown-line" />
          <div className="add-facility">
            <input
              placeholder="Others"
              value={facility}
              onChange={inputChangeHandler}
            />
            <Button
              size="sm"
              className="add-facility-button"
              onClick={onSubmit(facility)}
            >
              Add
            </Button>
          </div>
        </div>
      ) : (
        <div className="dropdown-item-container">
          <DropdownItem className="dropdown-item" onClick={backClickHandler}>
            Back
          </DropdownItem>
          <hr className="dropdown-line" />
          <DropdownItem className="dropdown-item" onClick={onSubmit("Gopay")}>
            Gopay
          </DropdownItem>
          <DropdownItem className="dropdown-item" onClick={onSubmit("OVO")}>
            OVO
          </DropdownItem>
          <DropdownItem
            className="dropdown-item"
            onClick={onSubmit("Debit/Credit Card")}
          >
            Debit/Credit Card
          </DropdownItem>
        </div>
      )}
    </DropdownMenu>
  );
};

export default FacilitiesDropdown;
