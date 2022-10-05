import React from "react";

const Button = ({ onClickFunction, text }) => {
  return (
    <div className="connect-btn" onClick={ onClickFunction}>
      <div className="button-container">
        <svg
          width="236"
          height="52"
          viewBox="0 0 236 52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M235 1H8.11246L1 9.33333V28.8846V50.5H9.5L235 51V1Z"
            fill="white"
            stroke="black"
            stroke-width="1.1"
          />
        </svg>
      </div>
      <p className="absollute-btn-part">{text}</p>
      <div className="absollute-btn-part button-background">
        <svg
          width="234"
          height="50"
          viewBox="0 0 234 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M234 0H7.11246L0 8.33333V27.8846V49.5H8.5L234 50V0Z"
            fill="black"
          />
        </svg>
      </div>
    </div>
  );
};

export default Button;
