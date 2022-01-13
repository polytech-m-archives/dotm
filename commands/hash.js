const {
  getDatabase,
  closeDatabase
} = require('../utils/connector');
const {
  findHashtags
} = require('../utils/query');
const {
  DateTime,
  Duration
} = require('luxon');

module.exports = {
  name: 'get-hash',
  handler: async (args) => {
    if (args.length === 0) {
      console.log('Usage: hashtag [project]');
      return;
    }

    const db = await getDatabase();

    // find all entries in the database
    const cursor = await findHashtags(args[1], args[2], db)
    
    // check if there are any result from the database
    let count = 0;
    if (await cursor.hasNext()) {
      count = (await cursor.next()).count;
    }

    const duration = Duration.fromObject({
      hour: count > 60 ? Math.floor(count / 60) : 0,
      minute: count % 60,
    }).toHuman()
    
    console.log(`You just work for ${duration} on the hashtag #${args[1]}.`);
    
    closeDatabase();
  }
}
