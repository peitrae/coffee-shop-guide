import React from "react";

const CoffeeShopOthersInfo = ({ averagePrice, contact, facilities }) => (
  <div className="row">
    {averagePrice ? (
      <div className="information__item">
        <span className="information__label">Average Price:</span>
        <span>{`Rp. ${averagePrice} (1 menu)`}</span>
      </div>
    ) : null}
    {contact ? (
      <div className="information__item">
        <span className="information__label">Contact:</span>
        <span>{contact}</span>
      </div>
    ) : null}
    {facilities ? (
      <div className="information__item">
        <span className="information__label">Facilities:</span>
        <div className="row">
          {facilities.map((facility, index) => (
            <span key={index} className="margin-b-6">
              {facility}
            </span>
          ))}
        </div>
      </div>
    ) : null}
  </div>
);

export default CoffeeShopOthersInfo;
