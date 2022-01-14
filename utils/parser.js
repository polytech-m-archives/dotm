const {
  DateTime
} = require('luxon');

const {
  today,
  yesterday,
} = require('./constant');

const {
  roundUp,
  parseNumeric,
  calculateTimeBetweenHours,
} = require('./number');

const {
  computeNumberOfDays,
  subtract,
  findNumberOfMonth,
} = require('./date');

const parseDateInput = (input, currentDay = today) => {
  let valid = false;
  let date = today;

  input = `${input}`.toLowerCase();

  if (input.match(/^[A-z]+$/g)) {
    const numberOfDays = computeNumberOfDays(currentDay, input);
    if (numberOfDays) {
      date = subtract(currentDay, 0, numberOfDays);
      valid = true;
    }
  } else

  if (input.match(/^[A-z]+ [0-9]+$/g)) {
    input = input.split(' ');

    date = currentDay.set({
      month: findNumberOfMonth(input[0]),
      day: parseInt(input[1]),
    });

    valid = true;
  } else
  
  if (input.match(/^([0-9]+\/?){2,3}$/g)) {
    input = input.split('/');

    date = currentDay.set({
      month: parseInt(input[0]),
      day: parseInt(input[1]),
      ...(input[2] && { year: parseInt(input[2]) }),
    });

    valid = true;
  }

  if (input === 'today') {
    date = today;
    valid = true;
  }

  if (input === 'yesterday' || input === 'y') {
    date = yesterday;
    valid = true;
  }

  return {
    valid,
    date,
  }
}

const parseTimeInput = (input, now = DateTime.now()) => {
  let valid = false;
  let date = today;
  let minutes = 0;

  // check if input is for yesterday
  if (input.startsWith('y ') || input.startsWith('yesterday ')) {
    date = parseDateInput('yesterday').date;
    input = input.replace(/^(y |yesterday )/g, '');
  }

  // check if input is like {numeric([h,m])}
  if (input.match(/^[0-9]+[hm]{0,1}$/g)) {
    minutes = parseNumeric(input);
    valid = true;
  }

  // check if input is like {numeric[:.,-]numeric}
  if (input.match(/^[0-9]+[:\.,-][0-9]+$/g)) {
    if (input.includes('-')) {
      minutes = calculateTimeBetweenHours(input.split('-')) * 60;
    }

    if (input.includes(':')) {
      const list = input.split(':').map((item) => parseInt(item));
      minutes = list[0] * 60 + roundUp(list[1]);
    }

    if (input.includes('.') || input.includes(',')) {
      const sep = input.includes('.') ? '.' : ',';
      const list = input.split(sep).map((item) => parseInt(item));
      minutes = list[0] * 60 + roundUp(60 * parseFloat(`${list[0]}.${list[1]}` - list[0]));
    }

    valid = true;
  }

  // check if input is like numeric[- to]
  if (input.match(/^[0-9]+(-| to)$/g)) {
    input = input.replace(/-| to/g, '');
    const diff = now.diff(today.plus({
      hours: parseInt(input)
    })).toMillis();
    minutes = Math.floor((diff / (1000 * 60)));
    valid = true;
  }

  if (input.match(/^[0-9]+(am|pm)-[0-9]+(am|pm)$/g)) {
    input = input.replace(/am|pm/g, '');
    minutes = calculateTimeBetweenHours(input.split('-')) * 60;
    valid = true;
  }

  return {
    valid,
    date,
    minutes,
  };
}

const parseInput = (input, currentTime = DateTime.now(), currentDate = today) => {
  let valid = false;
  let date = today;
  let minutes = 0;

  if (input.startsWith('y ') || input.startsWith('yesterday ')) {
    date = parseDateInput('yesterday').date;
    const timeParsed = parseTimeInput(input.split(' ')[1], currentTime);
    if (timeParsed) {
      minutes = timeParsed.minutes;
      valid = true;
    }
  }

  if (input.includes(',')) {
    let split = input.split(',').map((item) => item.trim());
    const dateParsed = parseDateInput(split[0], currentDate);
    if (dateParsed) {
      const timeParsed = parseTimeInput(split[1], currentTime);
      if (timeParsed) {
        date = dateParsed.date;
        minutes = timeParsed.minutes;
        valid = true;
      } else {
        const timeParsed = parseTimeInput(input, currentTime);
        if (timeParsed) {
          date = dateParsed.date;
          minutes = timeParsed.minutes;
          valid = true;
        }
      }
    }
  }

  return {
    valid,
    date,
    minutes,
  };
}

module.exports = {
  parseTimeInput,
  parseDateInput,
  parseInput,
}
