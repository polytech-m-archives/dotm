const { commands, defaultHandler } = require('./commands');

const findHandler = (name) => {
  return commands.find(command => command.name === name.toLowerCase()) || defaultHandler;;
}

const handle = (args) => {
  if (args.length === 0) {
    console.log('No arguments');
    return;
  }

  const targetCommand = args[0];
  const { handler } = findHandler(targetCommand);

  try {
    return handler(args);
  } catch (err) {
    console.log('An error occurred, please retry later.');
  }
}

module.exports = handle;
