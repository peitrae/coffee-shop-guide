import React, { useRef } from "react";
import useClickOutside from "../../../hooks/useClickOutside";

import "./BubbleBox.scss";

const BubbleBox = ({
  children,
  className,
  pos = "right",
  onClickOutside = () => {},
}) => {
  const bubbleBoxRef = useRef();

  useClickOutside(bubbleBoxRef, onClickOutside);

  return (
    <div
      ref={bubbleBoxRef}
      className={`bubblebox bubblebox-${pos} ${className}`}
    >
      {children}
    </div>
  );
};

export default BubbleBox;
