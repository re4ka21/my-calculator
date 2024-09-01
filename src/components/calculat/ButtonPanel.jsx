import React from "react";
import Button from "./Button";

function ButtonPanel({ onClick, onClear, onCalculate, clearType }) {
  const buttons = [
    { value: clearType, className: "white", onClick: onClear },
    { value: "+/-", className: "white", onClick },
    { value: "%", className: "white", onClick },
    { value: "/", className: "qwer", onClick },
    { value: "7", onClick },
    { value: "8", onClick },
    { value: "9", onClick },
    { value: "*", className: "qwer", onClick },
    { value: "4", onClick },
    { value: "5", onClick },
    { value: "6", onClick },
    { value: "-", className: "qwer", onClick },
    { value: "1", onClick },
    { value: "2", onClick },
    { value: "3", onClick },
    { value: "+", className: "qwer", onClick },
    { value: "0", className: "null", onClick },
    { value: ".", onClick },
    { value: "=", className: "qwert", onClick: onCalculate },
  ];

  return (
    <div className="buttons">
      {buttons.map((btn, index) => (
        <Button
          key={index}
          value={btn.value}
          className={btn.className}
          onClick={btn.onClick || onClick}
        />
      ))}
    </div>
  );
}

export default ButtonPanel;
