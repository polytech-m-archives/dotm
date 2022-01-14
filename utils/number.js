const isNumeric = (str) => {
  if (typeof str != 'string') return false;
  return !isNaN(str) && !isNaN(parseFloat(str));
}

const roundUp = (num, pre = 15) => {
  return Math.ceil(num / pre) * pre;
}

const parseNumeric = (input) => {
  if (checkNumericWithUnit(input)) {
    return parseNumericWithUnit(input);
  } else {
    return roundUp(parseInt(input));
  }
}

// check if input is numeric:[h,m]
const checkNumericWithUnit = (input) => {
  return isNumeric(`${input}`.slice(0, -1)) && ['h', 'm'].includes(`${input}`.slice(-1));
}

const parseNumericWithUnit = (input) => {
  let minutes = parseInt(`${input}`.slice(0, -1));
  if (`${input}`.slice(-1) === 'h') minutes *= 60;
  return minutes;
}

const calculateTimeBetweenHours = (list) => {
  list = list.map((item) => parseInt(item));
  if (list[0] > list[1]) list[1] += 12;
  return Math.abs(list[0] - list[1]);
}

module.exports = {
  isNumeric,
  roundUp,
  parseNumeric,
  checkNumericWithUnit,
  parseNumericWithUnit,
  calculateTimeBetweenHours,
}
