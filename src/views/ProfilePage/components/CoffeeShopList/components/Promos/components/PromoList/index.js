import React from "react";

import PromoItem from "./components/PromoItem";

const PromoList = ({ promos, handleEditPromo, handleDeletePromo }) =>
  promos
    ? Object.keys(promos).map((promoId) => (
        <PromoItem
          key={promoId}
          promoId={promoId}
          value={promos[promoId].value}
          handleEditPromo={handleEditPromo}
          handleDeletePromo={handleDeletePromo}
        />
      ))
    : null;

export default PromoList;
