import React, { useState } from "react";
import Display from "./Display";
import ButtonPanel from "./ButtonPanel";
import { calculate, formatNumber, formatResult } from "./utils";

function Calculator() {
  const [input, setInput] = useState("0");
  const [expression, setExpression] = useState("");
  const [isResult, setIsResult] = useState(false);
  const [lastOperation, setLastOperation] = useState({
    operator: "",
    operand: "",
  });
  const [replaceInput, setReplaceInput] = useState(false);
  const [clearType, setClearType] = useState("AC");
  const [resetFontSize, setResetFontSize] = useState(false); // Новий стан

  const handleClick = (value) => {
    setResetFontSize(false); // Вимикаємо скидання розміру шрифту
    const operators = ["+", "-", "*", "/"];

    if (isResult) {
      if (operators.includes(value)) {
        setExpression(input + " " + value + " ");
        setReplaceInput(true);
        setLastOperation({ operator: value, operand: "" });
        setIsResult(false);
      } else {
        setInput(value);
        setExpression("");
        setLastOperation({ operator: "", operand: "" });
        setIsResult(false);
      }
    } else {
      if (operators.includes(value)) {
        if (expression && operators.includes(expression.trim().slice(-1))) {
          setExpression(expression.slice(0, -3) + " " + value + " ");
        } else {
          if (expression) {
            setExpression(expression + input + " " + value + " ");
          } else {
            setExpression(input + " " + value + " ");
          }
        }
        setReplaceInput(true);
        setLastOperation({ operator: value, operand: input });
        setClearType("C");
      } else if (value === "%") {
        setInput((parseFloat(input.replace(/\s/g, "")) / 100).toString());
        setClearType("C");
      } else if (value === "+/-") {
        setInput((parseFloat(input.replace(/\s/g, "")) * -1).toString());
        setClearType("C");
      } else {
        if (replaceInput) {
          setInput(value);
          setReplaceInput(false);
        } else if (input.replace(/\s/g, "").length < 9) {
          if (input === "0" && value !== ".") {
            setInput(value);
          } else if (value === "." && input.includes(".")) {
            return;
          } else {
            setInput(input + value);
          }
        }
        setClearType("C");
      }
    }
  };

  const clearClick = () => {
    setInput("0");
    setExpression("");
    setIsResult(false);
    setLastOperation({ operator: "", operand: "" });
    setClearType("AC");
    setResetFontSize(true); // Увімкнути скидання розміру шрифту
  };

  const handleCalculate = () => {
    if (expression || input) {
      try {
        let result;
        if (isResult && lastOperation.operator && lastOperation.operand) {
          const newExpression =
            input + " " + lastOperation.operator + " " + lastOperation.operand;
          result = calculate(newExpression);
        } else {
          const finalExpression = expression + input;
          result = calculate(finalExpression);

          const match = finalExpression.match(
            /(\d+(\.\d+)?)\s*([\+\-\*\/])\s*(\d+(\.\d+)?)/
          );
          if (match) {
            setLastOperation({ operator: match[3], operand: match[4] });
          }
        }

        result = formatResult(result);
        setInput(result);
        setExpression("");
        setIsResult(true);
        setClearType("C");
        setResetFontSize(true); // Увімкнути скидання розміру шрифту після обчислення
      } catch (error) {
        console.error("Error:", error);
        setInput(formatResult(0));
        setExpression("");
        setIsResult(true);
        setClearType("AC");
        setResetFontSize(true); // Увімкнути скидання розміру шрифту у випадку помилки
      }
    }
  };

  return (
    <div className="calculator">
      <Display input={input} resetFontSize={resetFontSize} />
      <ButtonPanel
        onClick={handleClick}
        onClear={clearClick}
        onCalculate={handleCalculate}
        clearType={clearType}
      />
    </div>
  );
}

export default Calculator;
