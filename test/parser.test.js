const { parseTimeInput, parseDateInput, parseInput } = require('../utils/parser');
const { DateTime } = require('luxon');

const today = DateTime.fromFormat(DateTime.now().toFormat('MM-dd-yyyy'), 'MM-dd-yyyy');
const yesterday = DateTime.fromISO(today.toISO()).minus({ day: 1 });

describe('test intelligent guesses from time input', () => {

  it('should understand "15"', () => {
    const { valid, date, minutes } = parseTimeInput('15');
    expect(valid).toBe(true);
    expect(date.toISO()).toBe(today.toISO());
    expect(minutes).toBe(15);
  });

  it('should understand "15m"', () => {
    const { valid, date, minutes } = parseTimeInput('15m');
    expect(valid).toBe(true);
    expect(date.toISO()).toBe(today.toISO());
    expect(minutes).toBe(15);
  });

  it('should understand "15h"', () => {
    const { valid, date, minutes } = parseTimeInput('15h');
    expect(valid).toBe(true);
    expect(date.toISO()).toBe(today.toISO());
    expect(minutes).toBe(900);
  });

  it('should understand "13"', () => {
    const { valid, date, minutes } = parseTimeInput('13');
    expect(valid).toBe(true);
    expect(date.toISO()).toBe(today.toISO());
    expect(minutes).toBe(15);
  });

  it('should understand "2h"', () => {
    const { valid, date, minutes } = parseTimeInput('2h');
    expect(valid).toBe(true);
    expect(date.toISO()).toBe(today.toISO());
    expect(minutes).toBe(120);
  });

  it('should understand "6h"', () => {
    const { valid, date, minutes } = parseTimeInput('6h');
    expect(valid).toBe(true);
    expect(date.toISO()).toBe(today.toISO());
    expect(minutes).toBe(360);
  });

  it('should understand "9-5"', () => {
    const { valid, date, minutes } = parseTimeInput('9-5');
    expect(valid).toBe(true);
    expect(date.toISO()).toBe(today.toISO());
    expect(minutes).toBe(480);
  });

  it('should understand "2pm-4pm"', () => {
    const { valid, date, minutes } = parseTimeInput('2pm-4pm');
    expect(valid).toBe(true);
    expect(date.toISO()).toBe(today.toISO());
    expect(minutes).toBe(120);
  });

  it('should understand "1:15"', () => {
    const { valid, date, minutes } = parseTimeInput('1:15');
    expect(valid).toBe(true);
    expect(date.toISO()).toBe(today.toISO());
    expect(minutes).toBe(75);
  });

  it('should understand "1,17"', () => {
    const { valid, date, minutes } = parseTimeInput('1,17');
    expect(valid).toBe(true);
    expect(date.toISO()).toBe(today.toISO());
    expect(minutes).toBe(75);
  });

  it('should understand "1,5"', () => {
    const { valid, date, minutes } = parseTimeInput('1,5');
    expect(valid).toBe(true);
    expect(date.toISO()).toBe(today.toISO());
    expect(minutes).toBe(90);
  });

  it('should understand "3.5"', () => {
    const { valid, date, minutes } = parseTimeInput('3.5');
    expect(valid).toBe(true);
    expect(date.toISO()).toBe(today.toISO());
    expect(minutes).toBe(210);
  });

  it('should understand "2.75"', () => {
    const { valid, date, minutes } = parseTimeInput('2.75');
    expect(valid).toBe(true);
    expect(date.toISO()).toBe(today.toISO());
    expect(minutes).toBe(165);
  });

  it('should understand "9-"', () => {
    const { valid, date, minutes } = parseTimeInput('9-', today.plus({ hours: '10' }));
    expect(valid).toBe(true);
    expect(date.toISO()).toBe(today.toISO());
    expect(minutes).toBe(60);
  });

  it('should understand "9 to"', () => {
    const { valid, date, minutes } = parseTimeInput('9 to', today.plus({ hours: '10' }));
    expect(valid).toBe(true);
    expect(date.toISO()).toBe(today.toISO());
    expect(minutes).toBe(60);
  });

});

describe('test intelligent guesses from date input', () => {

  it('should understand "today"', () => {
    const { valid, date } = parseDateInput('today');
    expect(valid).toBe(true);
    expect(date.toISO()).toBe(today.toISO());
  });

  it('should understand "yesterday"', () => {
    const { valid, date } = parseDateInput('yesterday');
    expect(valid).toBe(true);
    expect(date.toISO()).toBe(yesterday.toISO());
  });

  it('should understand "y"', () => {
    const { valid, date } = parseDateInput('y');
    expect(valid).toBe(true);
    expect(date.toISO()).toBe(yesterday.toISO());
  });

  it('should understand "Thursday"', () => {
    const { valid, date } = parseDateInput('Thursday', DateTime.fromISO('2022-01-14T00:00:00Z'));
    expect(valid).toBe(true);
    expect(date.toISO()).toBe(DateTime.fromISO('2022-01-13T00:00:00Z').toISO());
  });

  it('should understand "Thurs"', () => {
    const { valid, date } = parseDateInput('Thurs', DateTime.fromISO('2022-01-14T00:00:00Z'));
    expect(valid).toBe(true);
    expect(date.toISO()).toBe(DateTime.fromISO('2022-01-13T00:00:00Z').toISO());
  });

  it('should understand "Thu"', () => {
    const { valid, date } = parseDateInput('Thu', DateTime.fromISO('2022-01-14T00:00:00Z'));
    expect(valid).toBe(true);
    expect(date.toISO()).toBe(DateTime.fromISO('2022-01-13T00:00:00Z').toISO());
  });

  it('should understand "2/5"', () => {
    const { valid, date } = parseDateInput('2/5', DateTime.fromISO('2021-01-14T00:00:00+02:00Z'));
    expect(valid).toBe(true);
    expect(date.toISO()).toBe(DateTime.fromISO('2021-02-05T00:00:00+02:00Z').toISO());
  });

  it('should understand "2/5/2022"', () => {
    const { valid, date } = parseDateInput('2/5/2022');
    expect(valid).toBe(true);
    expect(date.toISO()).toBe(DateTime.fromISO('2022-02-05T00:00:00.000+01:00').toISO());
  });

  it('should understand "December 12"', () => {
    const { valid, date } = parseDateInput('December 12');
    expect(valid).toBe(true);
    expect(date.toISO()).toBe(DateTime.fromISO('2022-12-12T00:00:00.000+01:00').toISO());
  });

});

describe('test intelligent guesses from input', () => {

  it('should understand "y 15"', () => {
    const { valid, date, minutes } = parseInput('y 15');
    expect(valid).toBe(true);
    expect(date.toISO()).toBe(yesterday.toISO());
    expect(minutes).toBe(15);
  });

  it('should understand "y 2h"', () => {
    const { valid, date, minutes } = parseInput('y 2h');
    expect(valid).toBe(true);
    expect(date.toISO()).toBe(yesterday.toISO());
    expect(minutes).toBe(120);
  });

  it('should understand "yesterday 14"', () => {
    const { valid, date, minutes } = parseInput('yesterday 14');
    expect(valid).toBe(true);
    expect(date.toISO()).toBe(yesterday.toISO());
    expect(minutes).toBe(15);
  });

  it('should understand "yesterday, 14"', () => {
    const { valid, date, minutes } = parseInput('yesterday, 14');
    expect(valid).toBe(true);
    expect(date.toISO()).toBe(yesterday.toISO());
    expect(minutes).toBe(15);
  });

  it('should understand "Thurs, 2:45"', () => {
    const { valid, date, minutes } = parseInput('Thurs, 2:45', undefined, DateTime.fromISO('2022-01-14T00:00:00Z'));
    expect(valid).toBe(true);
    expect(minutes).toBe(165);
    expect(date.toISO()).toBe(DateTime.fromISO('2022-01-13T00:00:00Z').toISO());
  });

  it('should understand "Oct 21, 0.5"', () => {
    const { valid, date, minutes } = parseInput('Oct 21, 0.5');
    expect(valid).toBe(true);
    expect(minutes).toBe(30);
    expect(date.toISO()).toBe(DateTime.fromISO('2022-10-21T00:00:00.000+02:00').toISO());
  });

  it('should understand "Oct 21 0.5"', () => {
    const { valid, date, minutes } = parseInput('Oct 21 0.5');
    expect(valid).toBe(true);
    expect(minutes).toBe(30);
    expect(date.toISO()).toBe(DateTime.fromISO('2022-10-21T00:00:00.000+02:00').toISO());
  });

  it('should understand "Oct 21 .5"', () => {
    const { valid, date, minutes } = parseInput('Oct 21 .5');
    expect(valid).toBe(true);
    expect(minutes).toBe(30);
    expect(date.toISO()).toBe(DateTime.fromISO('2022-10-21T00:00:00.000+02:00').toISO());
  });

  it('should understand "2/5, 2pm-4pm"', () => {
    const { valid, date, minutes } = parseInput('2/5, 2pm-4pm');
    expect(valid).toBe(true);
    expect(minutes).toBe(120);
    expect(date.toISO()).toBe(DateTime.fromISO('2022-02-05T00:00:00.000+01:00').toISO());
  });

  it('should understand "1/1/2017, 2h"', () => {
    const { valid, date, minutes } = parseInput('1/1/2017, 2h');
    expect(valid).toBe(true);
    expect(minutes).toBe(120);
    expect(date.toISO()).toBe(DateTime.fromISO('2017-01-01T00:00:00.000+01:00').toISO());
  });

  it('should understand "1/1/2017 2h"', () => {
    const { valid, date, minutes } = parseInput('1/1/2017 2h');
    expect(valid).toBe(true);
    expect(minutes).toBe(120);
    expect(date.toISO()).toBe(DateTime.fromISO('2017-01-01T00:00:00.000+01:00').toISO());
  });

  it('should understand "9 to"', () => {
    const { valid, date, minutes } = parseInput('9 to', today.plus({ hours: '10' }));
    expect(valid).toBe(true);
    expect(date.toISO()).toBe(today.toISO());
    expect(minutes).toBe(60);
  });

  it('should understand "Friday .99"', () => {
    const { valid, date, minutes } = parseInput('Friday .99', undefined, DateTime.fromISO('2022-01-14T00:00:00Z'));
    expect(valid).toBe(true);
    expect(date.toISO()).toBe(today.toISO());
    expect(minutes).toBe(60);
  });

});
