import React, { useContext } from "react";

import { FunctionContext } from "../..";
import Card from "../../../../components/UI/Card";
import AveragePrice from "./components/AveragePrice";
import Contact from "./components/Contact";
import OperationalHours from "./components/OperationalHours";
import Facilities from "./components/Facilities";

const Information = ({
  averagePrice,
  contact,
  facilities,
  operationalHours,
}) => {
  const { handleInputChange } = useContext(FunctionContext);

  return (
    <Card className="information margin-b-16">
      <h2 className="add-coffeeshop__title">Information</h2>
      <div className="row">
        <AveragePrice value={averagePrice} onChange={handleInputChange} />
        <Contact value={contact} onChange={handleInputChange} />
        <OperationalHours operationalHours={operationalHours} />
        <Facilities facilities={facilities} />
      </div>
    </Card>
  );
};

export default Information;
