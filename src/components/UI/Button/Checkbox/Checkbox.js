import React, { forwardRef } from "react";
import "./Checkbox.scss";

const Checkbox = forwardRef((props, ref) => (
  <label className={`checkbox ${props.className}`} ref={ref}>
    <input
      type="checkbox"
      name={props.inputId}
      className="checkbox-input"
      value={props.label}
      onChange={props.changed}
      checked={props.checked}
    />
    <div className="checkbox-checkmark">
      <div>{props.label}</div>
    </div>
  </label>
));

export default Checkbox;
