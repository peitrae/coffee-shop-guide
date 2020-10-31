import React from "react";

import TextForm from "../../../../components/UI/TextForm/TextForm";
import { PlainBtn } from "../../../../components/UI/Button/Button";
import TrashIcon from "../../../../assets/icon/TrashIcon";

import "./Facilities.scss";

const Facilities = ({
  facilities = [""],
  facilityChangeHandler,
  deleteClickHandler,
}) => (
  <div className="facilities-grp">
    {facilities.map((facility, index) => (
      <div key={index}>
        <div className="facility" key={index}>
          <TextForm
            id="facilities"
            label="Facilities"
            placeholder="Facilities"
            className={"textField-3"}
            value={facility}
            inputHandler={facilityChangeHandler(index)}
          />
          <PlainBtn className="delete-btn" onClick={deleteClickHandler(index)}>
            <TrashIcon />
          </PlainBtn>
        </div>
      </div>
    ))}
  </div>
);

export default Facilities;
