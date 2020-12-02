import React, { useState, useRef } from "react";

import Dropdown, {
  DropdownMenu,
  DropdownItem,
} from "../../../../../../components/UI/Dropdown/Dropdown";
import useClickOutside from "../../../../../../hooks/useClickOutside";

import "./DayDropdown.scss";

const DayDropdown = ({ day, daysOptions, onChange, index }) => {
  const menuRef = useRef();

  const [showMenu, setShowMenu] = useState(false);

  const days = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
  };

  const onClickDropdown = () => setShowMenu(true);

  const onClickItem = (e, day) => {
    setShowMenu(false);
    onChange(e, day, index);
  };

  useClickOutside(menuRef, () => {
    setShowMenu(false);
  });

  return (
    <Dropdown
      value={day !== undefined ? days[day] : ""}
      className="day-dropdown"
      placeholder="Day"
      onClick={onClickDropdown}
    >
      {showMenu ? (
        <DropdownMenu ref={menuRef}>
          {Object.keys(daysOptions).map((key) => (
            <DropdownItem key={key} onClick={(e) => onClickItem(e, key)}>
              {days[key]}
            </DropdownItem>
          ))}
        </DropdownMenu>
      ) : null}
    </Dropdown>
  );
};

export default DayDropdown;
