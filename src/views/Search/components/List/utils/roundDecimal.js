const roundDecimal = (float) => {
  const floatToArr = float.toFixed(2).toString().split("");

  if (floatToArr[floatToArr.length - 1] === "0") {
    floatToArr.pop();
  }

  return floatToArr.join("");
};

export default roundDecimal;
