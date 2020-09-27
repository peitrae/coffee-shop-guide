import React from "react";

const ShareIcon = ({ color = "#888888", className }) => (
  <i className={className}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 512 512"
    >
      <circle
        cx="128"
        cy="256"
        r="48"
        style={{
          fill: "none",
          stroke: color,
          strokeLinecap: "round",
          strokeLineJoin: "round",
          strokeWidth: "32px",
        }}
      />
      <circle
        cx="384"
        cy="112"
        r="48"
        style={{
          fill: "none",
          stroke: color,
          strokeLinecap: "round",
          strokeLineJoin: "round",
          strokeWidth: "32px",
        }}
      />
      <circle
        cx="384"
        cy="400"
        r="48"
        style={{
          fill: "none",
          stroke: color,
          strokeLinecap: "round",
          strokeLineJoin: "round",
          strokeWidth: "32px",
        }}
      />
      <line
        x1="169.83"
        y1="279.53"
        x2="342.17"
        y2="376.47"
        style={{
          fill: "none",
          stroke: color,
          strokeLinecap: "round",
          strokeLineJoin: "round",
          strokeWidth: "32px",
        }}
      />
      <line
        x1="342.17"
        y1="135.53"
        x2="169.83"
        y2="232.47"
        style={{
          fill: "none",
          stroke: color,
          strokeLinecap: "round",
          strokeLineJoin: "round",
          strokeWidth: "32px",
        }}
      />
    </svg>
  </i>
);

export default ShareIcon;
