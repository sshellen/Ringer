import React from "react";

const GameBoard = () => {
  return (
    <div id="gameBoard">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 397.79 550.92">
        <defs>
          <radialGradient
            id="radial-gradient"
            cx="327.16"
            cy="481.56"
            r="11.22"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="1%" stopColor="#facc88" />
            <stop offset="25%" stopColor="#fac984" />
            <stop offset="40%" stopColor="#f8c278" />
            <stop offset="55%" stopColor="#f6b563" />
            <stop offset="70%" stopColor="#f4a346" />
            <stop offset="74%" stopColor="#f39e3f" />
          </radialGradient>
          <radialGradient
            id="radial-gradient-2"
            cx="200.6"
            cy="254.54"
            r="50.2"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.22" />
            <stop offset="100%" stopColor="#2c5531" />
          </radialGradient>
          <linearGradient
            id="linear-gradient"
            x1="263.65"
            y1="172.21"
            x2="338.99"
            y2="172.21"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="34%" stopColor="#f9ed32" />
            <stop offset="42%" stopColor="#f2e631" />
            <stop offset="53%" stopColor="#dfd130" />
            <stop offset="67%" stopColor="#bfb02d" />
            <stop offset="83%" stopColor="#948129" />
            <stop offset="100%" stopColor="#5d4724" />
          </linearGradient>
          <linearGradient
            id="linear-gradient-2"
            x1="438.59"
            y1="232.95"
            x2="454.96"
            y2="232.95"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="9%" stopColor="#69c" />
            <stop offset="93%" stopColor="#5765af" />
          </linearGradient>
          <linearGradient
            id="linear-gradient-3"
            x1="478.08"
            y1="208.34"
            x2="478.08"
            y2="256.61"
          />
        </defs>
        <g id="background">
          <rect className="cls-3" y="46.39" width="397.2" height="461.34" />
          <rect className="cls-4" width="397.2" height="46.39" />
          <rect className="cls-4" y="507.73" width="397.2" height="43.19" />
        </g>
        <g id="paddles">
          <g id="leftPaddle">
            <rect
              className="cls-5"
              x="270.52"
              y="434.96"
              width="34.37"
              height="34.37"
              rx="8.21"
            />
            <polygon
              className="cls-6"
              points="292.15 459.92 279.27 452.48 292.15 445.04 292.15 459.92"
            />
          </g>
          <g id="topPaddle">
            <rect
              className="cls-5"
              x="310.55"
              y="406.56"
              width="34.37"
              height="34.37"
              rx="12"
            />

            <polygon
              className="cls-6"
              points="334.99 428.18 327.55 415.3 320.11 428.18 334.99 428.18"
            />
          </g>

          <g id="rightPaddle">
            <rect
              className="cls-5"
              x="349.01"
              y="435.16"
              width="34.37"
              height="34.37"
              rx="12"
            />
            <polygon
              className="cls-6"
              points="361.75 459.58 374.63 452.15 361.75 444.71 361.75 459.58"
            />
          </g>
          <g id="bottomPaddle">
            <rect
              className="cls-5"
              x="310.16"
              y="463.8"
              width="34.37"
              height="34.37"
              rx="12"
            />
            <polygon
              className="cls-6"
              points="334.35 477.25 326.91 490.13 319.47 477.25 334.35 477.25"
            />
          </g>
          <g id="switchSide">
            <rect
              className="cls-5"
              x="19.42"
              y="454.4"
              width="61.56"
              height="28.35"
              rx="12"
            />
            <path
              className="cls-7"
              d="M141.1,608.29a18.18,18.18,0,0,1,25.73,0"
              transform="translate(-103.4 -141.14)"
            />

            <circle className="cls-8" cx="29.2" cy="471.77" r="3.88" />
            <circle className="cls-8" cx="71.99" cy="470.57" r="3.88" />

            <polygon
              className="cls-6"
              points="34.61 468.51 42.12 468.87 38.67 462.19 34.61 468.51"
            />
          </g>
        </g>
        <g id="ringBackground">
          <circle className="cls-9" cx="200.3" cy="253.04" r="168.7" />
        </g>
        <g>
          <circle className="cls-15" cx="202.21" cy="252.54" r="69.23" />
        </g>

        <g id="cannon">
          <path
            className="cls-22"
            d="M448.1,256.34h0a6.88,6.88,0,0,1-6.85-6.86s-2.66-13.56-2.66-17.65c0-6.27,2.66-15.56,2.66-15.4a6.88,6.88,0,0,1,6.85-6.86h0a6.88,6.88,0,0,1,6.86,6.86v33A6.88,6.88,0,0,1,448.1,256.34Z"
            transform="translate(-103.4 -141.14)"
          />
          <path
            className="cls-23"
            d="M447.22,251.57h0c-2.66,0-4.84-2.5-4.84-5.54,0,0-1.87-11-1.87-14.27a62.15,62.15,0,0,1,1.87-12.44c0-3,2.18-5.54,4.84-5.54h0c2.66,0,4.83,2.49,4.83,5.54V246C452.05,249.07,449.88,251.57,447.22,251.57Z"
            transform="translate(-103.4 -141.14)"
          />
          <path
            className="cls-24"
            d="M500.35,203.05a35.39,35.39,0,0,0-19,5.4h0c-14,9.17-26.4,8-26.4,8V248c16.07.87,22.37,3.76,24.39,5l.81.58,0,0h0a35.16,35.16,0,0,0,20.17,6.19c1.63,0,.4-12.71.4-28.4S502,203.05,500.35,203.05Z"
            transform="translate(-103.4 -141.14)"
          />
        </g>
        <g id="Title">
          <path
            className="cls-30"
            d="M29.64,32.08H24.15V46.39H11V15.63H35.13q6.6,0,6.6,5.49l0,5.47c0,1.11-.76,2-2.22,2.77,1.46.73,2.2,1.65,2.2,2.75V46.39q0,4.39,4.39,4.39h22V64H36.23q-6.58,0-6.59-5.5Zm0-5.47V21.12H24.15l0,5.49Z"
          />
          <path
            className="cls-30"
            d="M57.11,22.22H43.92V15.63H57.11Zm-13.19,2.2H57.11v22H43.92Z"
          />
          <path
            className="cls-30"
            d="M71.39,46.37l-12.09,0v-22H76.88q6.57,0,6.59,5.49V46.39l-6.59,0,0-16.46H71.39Z"
          />
          <path
            className="cls-30"
            d="M109.86,58.47q0,5.51-6.59,5.5H71.41V50.78h22q4.4,0,4.4-4.39v0H92.29q-6.6,0-6.6-5.47v-11q0-5.49,6.6-5.49h17.57Zm-12.08-23V29.91H92.29V35.4Z"
          />
          <path
            className="cls-30"
            d="M136.21,35.4v11H118.63q-6.59,0-6.59-5.49v-11q0-5.52,6.59-5.51h13.18c2.93,0,4.4,1.09,4.4,3.29a6.32,6.32,0,0,1-2.2,4.4l-3.29,3.29Zm-6.59-5.49h-5.5V35.4Z"
          />
          <path
            className="cls-30"
            d="M138.43,46.39V29.93q0-5.52,6.59-5.51H158.2v5.49h-7.69V46.39Z"
          />
        </g>

        <g id="inner_ring" data-name="inner ring">
          <circle className="cls-28" cx="201.7" cy="251.59" r="68.28" />
        </g>
        <g id="r6c1">
          <path
            className="cls-29"
            d="M243.11,411.91c-13.82,0-22.13-8.14-22.13-18.16s8.31-18.16,22.13-18.16"
            transform="translate(-103.4 -141.14)"
          />
        </g>
        <g id="r6c2">
          <path
            className="cls-29"
            d="M366.78,412.25c13.82,0,22.13-8.13,22.13-18.16s-8.31-18.15-22.13-18.15"
            transform="translate(-103.4 -141.14)"
          />
        </g>
        <g id="hole">
          <circle cx="201.43" cy="253.68" r="16.19" />
        </g>
      </svg>
    </div>
  );
};

export default GameBoard;
