import React from "react";

import SmallPromoItem from "../../../../../../components/SmallPromoItem";

const PromoList = ({ promos }) => {
  return (
    <div className="main__promo-list">
      {Object.keys(promos).map((key) => (
        <SmallPromoItem key={key} className="margin-r-6">
          {promos[key].value}
        </SmallPromoItem>
      ))}
    </div>
  );
};

export default PromoList;
