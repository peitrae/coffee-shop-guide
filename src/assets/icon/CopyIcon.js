import React from "react";

const CopyIcon = ({ color = "#333333", className }) => (
  <i className={className}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20px"
      height="20px"
      viewBox="0 0 512 512"
    >
      <title>ionicons-v5-e</title>
      <rect
        x="128"
        y="128"
        width="336"
        height="336"
        rx="57"
        ry="57"
        style={{
          fill: "none",
          stroke: color,
          strokeLinejoin: "round",
          strokeWidth: "32px",
        }}
      />
      <path
        d="M383.5,128l.5-24a56.16,56.16,0,0,0-56-56H112a64.19,64.19,0,0,0-64,64V328a56.16,56.16,0,0,0,56,56h24"
        style={{
          fill: "none",
          stroke: color,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "32px",
        }}
      />
    </svg>
  </i>
);

export default CopyIcon;
