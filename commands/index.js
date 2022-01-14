const { getDatabase, closeDatabase } = require('../utils/connector');
const { findProject, createProject, addEntry } = require('../utils/query');
const { parseInput } = require('../utils/parser');

const getCommand = require('./get');
const hashCommand = require('./hash');
const reportCommand = require('./report');
const { extractHashtags } = require('../utils/hashtags');

const defaultHandler = {
  handler: async (args) => {
    if (args.length < 2) {
      console.log('Usage: time project [comment]');
      return;
    }

    const { valid, date, minutes } = parseInput(args[0]);
    if (!valid) {
      console.log('Incorrect type for time, please try again');
      return;
    }
    
    const projectName = args[1];
    const comment = args.splice(2, args.length).join(' ');
    const hashtags = extractHashtags(comment);

    const db = await getDatabase();
    
    // try find project and create if necessary
    const project = await findProject(projectName, db);
    if (!project) {
      await createProject(projectName, db);
    }

    // add new entry to our project
    await addEntry(projectName, date.toJSDate(), minutes, comment, hashtags, db);

    console.log('Added new entry to the project');
    closeDatabase();
  }
}

module.exports = {
  commands: [
    getCommand,
    hashCommand,
    reportCommand,
  ],
  defaultHandler,
};
