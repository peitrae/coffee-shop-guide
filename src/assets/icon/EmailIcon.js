import React from "react";

const EmailIcon = ({ color = "#ffffff", className }) => (
  <i className={className}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 512 512"
    >
      <title>ionicons-v5-o</title>
      <rect
        x="48"
        y="96"
        width="416"
        height="320"
        rx="40"
        ry="40"
        style={{
          fill: "none",
          stroke: color,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "32px",
        }}
      />
      <polyline
        points="112 160 256 272 400 160"
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

export default EmailIcon;
