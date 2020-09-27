import React from "react";
import CopyIcon from "../../../../../assets/icon/CopyIcon";

import "./TextIconField.scss";

const TextIconField = ({ value, onClick }) => (
  <div className="field-grp">
    <input className="field-input" value={value} readOnly={true}/>
    <button onClick={(event) => onClick(event, value)} className="field-btn">
      <CopyIcon className="field-btn-ico" />
    </button>
  </div>
);

export default TextIconField;
