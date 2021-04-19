import React, { useState } from "react";

import AddPromo from "../../../../../AddPromo";

const EditPromo = ({ value, promoId, handleEditPromo, handleClose }) => {
  const [promo, setPromo] = useState(value);

  const handleInputChange = (e) => setPromo(e.target.value);

  return (
    <div className="margin-b-12">
      <AddPromo
        value={promo}
        handleClose={handleClose}
        handleChangeInput={handleInputChange}
        handleSubmit={() => handleEditPromo(promo, promoId)}
      />
    </div>
  );
};

export default EditPromo;
