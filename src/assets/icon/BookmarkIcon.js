import React from "react";

const BookmarkIcon = ({ fill, color = "#888888" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 512 512"
  >
    <path
      d="M352,48H160a48,48,0,0,0-48,48V464L256,336,400,464V96A48,48,0,0,0,352,48Z"
      style={{
        fill,
        stroke: color,
        strokeLinecap: "round",
        strokeLineJoin: "round",
        strokeWidth: "32px",
      }}
    />
  </svg>
);

export default BookmarkIcon;
