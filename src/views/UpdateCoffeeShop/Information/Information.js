import React from "react";
import InputAdornment from "@material-ui/core/InputAdornment";

import TextForm from "../../../components/UI/TextForm/TextForm";
import Card from "../../../components/UI/Card/Card";
import Facilities from "./Facilities/Facilities";
import OperationalHours from "./OperationalHours/OperationalHours";
import { PlainBtn } from "../../../components/UI/Button/Button";

import PlusIcon from "../../../assets/icon/PlusIcon";

import "./Information.scss";

const Information = ({
  averagePrice,
  contact,
  facilities,
  operationalHours,
  inputChangeHandler,
  addFacilityClickHandler,
  onSubmitFacility,
  onDeleteFacility,
  addDaysClickHandler,
  deleteDaysClickHandler,
  dayChangeHandler,
  timeChangeHandler,
}) => (
  <Card className="add-coffeeshop-information">
    <h2>Information</h2>
    <div className="content-wrapper">
      <div className="information-col">
        <label className="information-col-title">Average Price</label>
        <TextForm
          id="averagePrice"
          label="Average Price"
          className={"textField-3"}
          placeholder="Average Price"
          value={averagePrice}
          inputHandler={inputChangeHandler("averagePrice")}
          type="number"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">Rp</InputAdornment>
            ),
          }}
        />
      </div>
      <div className="information-col">
        <label className="information-col-title">Contact</label>
        <TextForm
          id="contact"
          label="Contact"
          className={"textField-3"}
          placeholder="Contact"
          value={contact}
          inputHandler={inputChangeHandler("contact")}
          type="number"
        />
      </div>
      <div className="information-col top-align">
        <div className="information-col-title">
          <label>Operational Hours</label>
          {operationalHours.length < 7 ? (
            <PlainBtn className="add-btn" onClick={addDaysClickHandler}>
              <PlusIcon />
            </PlainBtn>
          ) : null}
        </div>
        <OperationalHours
          operationalHours={operationalHours}
          dayChangeHandler={dayChangeHandler}
          timeChangeHandler={timeChangeHandler}
          deleteDaysClickHandler={deleteDaysClickHandler}
        />
      </div>
      <Facilities
        facilities={facilities}
        addClickHandler={addFacilityClickHandler}
        onSubmit={onSubmitFacility}
        onDelete={onDeleteFacility}
      />
    </div>
  </Card>
);

export default React.memo(Information);
