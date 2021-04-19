import React, { useState, useRef } from "react";
import { useLocation } from "react-router";

import ShareButton from "./components/ShareButton";
import ShareBubbleBox from "./components/ShareBubbleBox";

const Share = () => {
  const shareButtonRef = useRef();
  const location = useLocation();

  const [showShare, setShowShare] = useState(false);

  const handleClickOutside = (e) => {
    if (shareButtonRef.current.contains(e.target)) {
      return;
    }

    setShowShare(!showShare);
  };

  const handleCopyLink = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="main__share">
      <ShareButton
        onClick={() => setShowShare(!showShare)}
        ref={shareButtonRef}
      />
      {showShare ? (
        <ShareBubbleBox
          link={process.env.REACT_APP_URL + location.pathname}
          handleClose={handleClickOutside}
          handleCopyLink={handleCopyLink}
        />
      ) : null}
    </div>
  );
};

export default Share;
