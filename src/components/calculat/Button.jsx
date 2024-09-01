import React from "react";

function Button({ value, onClick, className }) {
  return (
    <button onClick={() => onClick(value)} className={className}>
      {value}
    </button>
  );
}

export default Button;
