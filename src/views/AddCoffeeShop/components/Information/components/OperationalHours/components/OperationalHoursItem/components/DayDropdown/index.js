import React, { useState, useRef } from "react";
import { isEmpty } from "lodash";

import Dropdown, {
  DropdownMenu,
  DropdownItem,
} from "../../../../../../../../../../components/UI/Dropdown";
import useClickOutside from "../../../../../../../../../../hooks/useClickOutside";

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

  const handleDayClick = (e, day) => {
    setShowMenu(false);
    onChange(e, day, index);
  };

  useClickOutside(menuRef, () => {
    setShowMenu(false);
  });

  return (
    <Dropdown
      value={day !== undefined ? days[day] : ""}
      placeholder="Day"
      onClick={() => setShowMenu(true)}
    >
      {!isEmpty(daysOptions) && showMenu ? (
        <DropdownMenu ref={menuRef}>
          {Object.keys(daysOptions).map((key) => (
            <DropdownItem key={key} onClick={(e) => handleDayClick(e, key)}>
              {days[key]}
            </DropdownItem>
          ))}
        </DropdownMenu>
      ) : null}
    </Dropdown>
  );
};

export default DayDropdown;
