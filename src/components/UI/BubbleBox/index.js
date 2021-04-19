import React, { useRef } from "react";
import useClickOutside from "../../../hooks/useClickOutside";

const BubbleBox = ({
  children,
  className,
  align = "right",
  onClickOutside = () => {},
}) => {
  const bubbleBoxRef = useRef();

  useClickOutside(bubbleBoxRef, onClickOutside);

  return (
    <div
      ref={bubbleBoxRef}
      className={`bubblebox bubblebox--align-${align} ${className}`}
    >
      {children}
    </div>
  );
};

export default BubbleBox;
