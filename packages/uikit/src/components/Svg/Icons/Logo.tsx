import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
    <Svg viewBox="0 0 100 100" width="30px" height="30px" {...props} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="paint0_linear_1" x1="52" y1="7" x2="-7.5" y2="75" gradientUnits="userSpaceOnUse">
          <stop stopColor="#CEF249" />
          <stop offset="1" stopColor="#CEF249" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="paint0_linear_2" x1="48" y1="93" x2="93" y2="45" gradientUnits="userSpaceOnUse">
          <stop stopColor="#CEF249" />
          <stop offset="1" stopColor="#CEF249" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g id="logo">
        <g id="Group 427319185">
          <path id="Vector" d="M42.5 50L52.5 7C26.25 7.24571 5 25.92 5 48.7714C5 49.14 5 49.6314 5 50H42.5Z" fill="url(#paint0_linear_1)" />
          <path id="Vector_2" d="M57.5 50L47.5 93C73.75 92.7543 95 74.08 95 51.2286C95 50.86 95 50.3686 95 50H57.5Z" fill="url(#paint0_linear_2)" />
          <path id="Vector_3" d="M50 81.5743C74.8528 81.5743 95 67.713 95 50.6143C95 33.5156 74.8528 19.6543 50 19.6543C25.1472 19.6543 5 33.5156 5 50.6143C5 67.713 25.1472 81.5743 50 81.5743Z" fill="#CEF249" />
          <path id="Vector_4" d="M69.931 66C69.931 66 62.5 70 50 70C37.5 70 30.069 66 30.069 66C21.5 62 16 59.304 16 51.12V49.88C16 41.696 21.5 35 30.069 35C38.6379 35 45 38 50 38C55 38 62.3621 35 69.931 35C77.5 35 84 41.696 84 49.88V51.12C84 59.304 76 63 69.931 66Z" fill="#21212F" />
          <rect id="Rectangle 1159" x="28" y="42" width="9" height="17" rx="4.5" fill="#CEF249" />
          <rect id="Rectangle 1160" x="63" y="42" width="9" height="17" rx="4.5" fill="#CEF249" />
        </g>
      </g>
    </Svg>
  );
};

export default Icon;
