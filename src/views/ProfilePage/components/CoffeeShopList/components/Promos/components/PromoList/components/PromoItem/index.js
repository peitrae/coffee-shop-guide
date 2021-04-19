import React, { useState } from "react";

import Promo from "./components/Promo";
import EditPromo from "./components/EditPromo";

const PromoItem = ({ promoId, value, handleEditPromo, handleDeletePromo }) => {
  const [showEdit, setShowEdit] = useState(false);

  return showEdit ? (
    <EditPromo
      value={value}
      promoId={promoId}
      handleEditPromo={handleEditPromo}
      handleClose={() => setShowEdit(false)}
    />
  ) : (
    <Promo
      value={value}
      handleShowEditPromo={() => setShowEdit(true)}
      handleDeletePromo={() => handleDeletePromo(promoId)}
    />
  );
};

export default PromoItem;
