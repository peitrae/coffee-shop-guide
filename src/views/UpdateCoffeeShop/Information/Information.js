import React from "react";

import Card from "../../../components/UI/Card/Card";
import AveragePrice from "./AveragePrice/AveragePrice";
import Contact from "./Contact/Contact";
import Facilities from "./Facilities/Facilities";
import OperationalHours from "./OperationalHours/OperationalHours";

import "./Information.scss";

const Information = ({
  averagePrice,
  contact,
  facilities,
  operationalHours,
}) => (
  <Card className="information">
    <h2>Information</h2>
    <div className="content-wrapper">
      <AveragePrice value={averagePrice} />
      <Contact value={contact} />
      <OperationalHours operationalHours={operationalHours} />
      <Facilities facilities={facilities} />
    </div>
  </Card>
);

export default Information;
