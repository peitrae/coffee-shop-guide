import React, { useContext, useState } from "react";

import { FunctionContext } from "../../../..";
import { Button } from "../../../../../../components/UI/Button";
import { ReactComponent as PlusIcon } from "../../../../../../assets/svg/plus.svg";
import FacilitiesList from "./components/FacilitiesList";
import AddFacilitiesMenu from "./components/AddFacilitiesMenu";

const Facilities = ({ facilities }) => {
  const { handleSubmitFacilities, handleDeleteFacilities } = useContext(
    FunctionContext
  );

  const [showFacilitiesMenu, setShowFacilitiesMenu] = useState(false);

  const handleSubmit = (e, facility) => {
    e.preventDefault();

    handleSubmitFacilities(facility);
    setShowFacilitiesMenu(false);
  };

  const handleShowDropdownToogle = (e) => {
    e.preventDefault();
    setShowFacilitiesMenu(!showFacilitiesMenu);
  };

  return (
    <div className="col margin-v-8 facilities">
      <label className="add-coffeeshop__label">Facilities</label>
      <div className="row">
        <FacilitiesList
          facilities={facilities}
          handleDeleteFacilities={handleDeleteFacilities}
        />
        <div className="facilities__add">
          <Button
            size="sm"
            type="text"
            onClick={handleShowDropdownToogle}
            icon={PlusIcon}
          >
            Add facility
          </Button>
          {showFacilitiesMenu ? (
            <AddFacilitiesMenu
              facilities={facilities}
              handleSubmit={handleSubmit}
              handleClose={handleShowDropdownToogle}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Facilities;
