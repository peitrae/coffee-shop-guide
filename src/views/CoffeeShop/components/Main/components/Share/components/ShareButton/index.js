import React, { forwardRef } from "react";

import ShareIcon from "../../../../../../../../assets/icon/ShareIcon";

const ShareButton = forwardRef(({ onClick }, ref) => (
  <button className="btn-icon-only" onClick={onClick} ref={ref}>
    <ShareIcon />
  </button>
));

export default ShareButton;
