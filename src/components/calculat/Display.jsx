import React, { useEffect, useRef, useState } from "react";
import { formatNumber } from "./utils";

function Display({ input, resetFontSize }) {
  const [fontSize, setFontSize] = useState(80); // Початковий розмір шрифту
  const inputRef = useRef(null);

  useEffect(() => {
    const containerWidth = inputRef.current.offsetWidth;
    const textWidth = inputRef.current.scrollWidth;

    if (textWidth > containerWidth) {
      setFontSize((prevSize) => prevSize - 2);
    } else if (textWidth < containerWidth && fontSize < 80) {
      setFontSize((prevSize) => prevSize + 2);
    }
  }, [input, fontSize]);

  useEffect(() => {
    if (resetFontSize) {
      setFontSize(80); // Скидаємо розмір шрифту до початкового
    }
  }, [resetFontSize]);

  return (
    <div className="display">
      <input
        ref={inputRef}
        type="text"
        value={formatNumber(input)}
        readOnly
        style={{ fontSize: `${fontSize}px` }}
      />
    </div>
  );
}

export default Display;
