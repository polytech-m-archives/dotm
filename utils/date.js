const {
  daysOfTheWeek,
  mediumDaysOfTheWeek,
  shortDaysOfTheWeek,
  months,
  shortMonths,
} = require('./constant');

const findNumberOfDays = (currentDay, input, list) => {
  const nowIndex = list.indexOf(currentDay.toFormat('EEEE').toLowerCase().slice(0, list[0].length));
  const targetIndex = list.indexOf(input);
  if (nowIndex === -1 || targetIndex === -1) return false;
  return targetIndex <= nowIndex ? nowIndex - targetIndex : (7 + nowIndex) - targetIndex;
}

const findNumberOfMonths = (currentDay, input, list) => {
  const nowIndex = list.indexOf(currentDay.toFormat('MMMM').toLowerCase().slice(0, list[0].length));
  const targetIndex = list.indexOf(input);
  return targetIndex <= nowIndex ? nowIndex - targetIndex : (12 + nowIndex) - targetIndex;
}

const subtract = (currentDay, months, days) => {
  return currentDay.minus({
    months,
    days,
  });
}

const findNumberOfMonth = (input) => {
  const array = input.length === 3 ? shortMonths : months;
  return (array.indexOf(input.toLowerCase()) + 1);
}

const computeNumberOfDays = (currentDay, input) => {
  const array = input.length === 3 ? shortDaysOfTheWeek : input.length === 5 ? mediumDaysOfTheWeek : daysOfTheWeek;
  return findNumberOfDays(currentDay, input, array);
}

const isMonth = (input) => {
  input = input.toLowerCase();
  return months.includes(input) || shortMonths.includes(input);
}

module.exports = {
  computeNumberOfDays,
  findNumberOfDays,
  findNumberOfMonths,
  findNumberOfMonth,
  subtract,
  isMonth,
}
