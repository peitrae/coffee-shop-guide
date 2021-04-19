import React, { useState, useRef } from "react";

import {
  DropdownMenu,
  DropdownItem,
  DropdownSeparator,
  DropdownSection,
} from "../../../../../../../../components/UI/Dropdown";
import { ReactComponent as WifiIcon } from "../../../../../../../../assets/svg/wifi.svg";
import { ReactComponent as PaymentIcon } from "../../../../../../../../assets/svg/payment.svg";
import { ReactComponent as RightArrowIcon } from "../../../../../../../../assets/svg/right-arrow.svg";
import useClickOutside from "../../../../../../../../hooks/useClickOutside";
import AddFacilitiesInput from "./components/AddFacilitiesInput";

const AddFacilitiesMenu = ({ facilities, handleClose, handleSubmit }) => {
  const menuRef = useRef();

  const [activeMenu, setActiveMenu] = useState("main"); // payment
  const [facility, setFacility] = useState("");

  useClickOutside(menuRef, handleClose);

  const handlePaymentClick = (e) => {
    e.preventDefault();
    setActiveMenu("payment");
  };

  const backClickHandler = (e) => {
    e.preventDefault();
    setActiveMenu("main");
  };

  const handleInputChange = (e) => setFacility(e.target.value);

  return (
    <DropdownMenu className="add-facilities__menu" ref={menuRef}>
      {activeMenu === "main" ? (
        <DropdownSection>
          {facilities.includes("Wifi") ? null : (
            <DropdownItem
              leftIcon={<WifiIcon />}
              className="add-facilities__item"
              onClick={(e) => handleSubmit(e, "Wifi")}
            >
              Wifi
            </DropdownItem>
          )}
          <DropdownItem
            leftIcon={<PaymentIcon />}
            rightIcon={<RightArrowIcon />}
            className="add-facilities__item"
            onClick={handlePaymentClick}
          >
            Payment
          </DropdownItem>
          <DropdownSeparator />
          <AddFacilitiesInput
            value={facility}
            onChange={handleInputChange}
            handleSubmit={(e) => handleSubmit(e, facility)}
          />
        </DropdownSection>
      ) : (
        <DropdownSection>
          <DropdownItem
            className="add-facilities__item"
            onClick={backClickHandler}
          >
            Back
          </DropdownItem>
          <DropdownSeparator />
          <DropdownItem
            className="add-facilities__item"
            onClick={(e) => handleSubmit(e, "Gopay")}
          >
            Gopay
          </DropdownItem>
          <DropdownItem
            className="add-facilities__item"
            onClick={(e) => handleSubmit(e, "OVO")}
          >
            OVO
          </DropdownItem>
          <DropdownItem
            className="add-facilities__item"
            onClick={(e) => handleSubmit(e, "Debit/Credit Card")}
          >
            Debit/Credit Card
          </DropdownItem>
        </DropdownSection>
      )}
    </DropdownMenu>
  );
};

export default AddFacilitiesMenu;
