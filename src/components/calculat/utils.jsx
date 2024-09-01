export const formatNumber = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

export const formatResult = (result) => {
  const maxLength = 9;
  const resultString = result.toString();

  if (resultString.length > maxLength) {
    return parseFloat(result).toExponential();
  } else {
    return resultString;
  }
};

export const calculate = (expression) => {
  const sanitizedExpression = expression.replace(
    /(\d+(\.\d+)?)%/g,
    (match, p1) => `(${p1} / 100)`
  );
  return new Function(
    "return " + sanitizedExpression.replace(/[^-()\d/*+.]/g, "")
  )();
};
