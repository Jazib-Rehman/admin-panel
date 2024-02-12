import React from "react";
import "./logo.css";
const Logo = ({ primary, secondary }) => (
  <svg
    id="ed9LrpgBxi21"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 87 40"
    shapeRendering="geometricPrecision"
    textRendering="geometricPrecision"
  >
    <text
      dx="0"
      dy="0"
      font-family="'ed9LrpgBxi21:::Abril Fatface'"
      font-size="30"
      font-weight="400"
      transform="translate(5.905762 30.10)"
      stroke-width="0"
      style={{
        fill: primary,
      }}
    >
      <tspan y="0" font-weight="400" stroke-width="0">
        J
      </tspan>
    </text>
    <text
      dx="0"
      dy="0"
      font-family="'ed9LrpgBxi21:::Abril Fatface'"
      font-size="30"
      font-weight="400"
      transform="translate(14.830106 30.080312)"
      stroke-width="0"
      style={{
        fill: secondary,
      }}
    >
      <tspan y="0" font-weight="400" stroke-width="0">
        Z
      </tspan>
    </text>
    <text
      dx="0"
      dy="0"
      font-family="'ed9LrpgBxi21:::Concert One'"
      font-size="15"
      font-weight="400"
      transform="translate(40.027371 30.412777)"
      stroke-width="0"
      style={{
        fill: secondary,
      }}
    >
      <tspan y="0" font-weight="400" stroke-width="0">
        Stores.
      </tspan>
    </text>
    <line
      x1="-43.698887"
      y1="0"
      x2="43.698887"
      y2="0"
      transform="translate(43.657925 39)"
      fill={secondary}
      stroke={secondary}
      style={{
        fill: secondary,
        stroke: secondary,
      }}
      stroke-width="3"
    />
    <line
      x1="-43.698887"
      y1="-0.163056"
      x2="43.698887"
      y2="0.163056"
      transform="translate(43.657925 0.648978)"
      fill={primary}
      stroke={primary}
      stroke-width="3"
    />
  </svg>
);

export default Logo;
