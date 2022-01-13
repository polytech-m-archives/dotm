const { getDatabase, closeDatabase } = require('../utils/connector');
const { findProject, createProject, addEntry } = require('../utils/query');

const getCommand = require('./get');
const hashCommand = require('./hash');
const reportCommand = require('./report');
const { extractHashtags } = require('../utils/hashtags');

const defaultHandler = {
  handler: async (args) => {
    console.log(args.length, args);
    if (args.length < 3) {
      console.log('Usage: time project comment');
      return;
    }

    // todo: add date & time parser
    const minutes = parseInt(args[0]);
    
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
    await addEntry(projectName, new Date(), minutes, comment, hashtags, db);

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
