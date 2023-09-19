//This function takes an array and returns a string. The string should be formatted. Each element in the array should be on a new line.
exports.arrayToReadableString = function (array) {
  let retVal = "";
  array.forEach((element) => {
    retVal += element + "\n";
  });
  return retVal;
};
