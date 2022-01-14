const {
  DateTime
} = require('luxon');

const today = DateTime.fromFormat(DateTime.now().toUTC().toFormat('MM-dd-yyyy'), 'MM-dd-yyyy', { zone: 'UTC' }).toUTC();
const yesterday = DateTime.fromISO(today).minus({
  day: 1
}).toUTC();

const daysOfTheWeek = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
].map(day => day.toLowerCase());

const mediumDaysOfTheWeek = [
  'Monda',
  'Tuesd',
  'Wedne',
  'Thurs',
  'Frida',
  'Satur',
  'Sunda',
].map(day => day.toLowerCase());

const shortDaysOfTheWeek = [
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat',
  'Sun',
].map(day => day.toLowerCase());

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
].map(day => day.toLowerCase());

const shortMonths = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
].map(day => day.toLowerCase());

module.exports = {
  daysOfTheWeek,
  mediumDaysOfTheWeek,
  shortDaysOfTheWeek,
  months,
  shortMonths,
  today,
  yesterday,
};
