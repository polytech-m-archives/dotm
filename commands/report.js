const {
  getDatabase,
  closeDatabase
} = require('../utils/connector');
const {
  findDailyReport
} = require('../utils/query');
const {
  Duration,
  DateTime,
} = require('luxon');

module.exports = {
  name: 'report',
  handler: async (args) => {
    if (args.length === 0) {
      console.log('Usage: PERDAY [project]');
      return;
    }

    const db = await getDatabase();

    // find all entries in the database
    const cursor = await findDailyReport(args[2], db);

    const dailyReport = await cursor.toArray();

    if (dailyReport.length === 0) {
      console.log('No daily report found!');
    } else {
      // iterate over all days in the database
      for (const daily of dailyReport) {
        const duration = Duration.fromObject({
          hour: daily.count > 60 ? Math.floor(daily.count / 60) : 0,
          minute: daily.count % 60,
        }).toHuman();
  
        console.log(`You just work for ${duration} on ${DateTime.fromISO(daily._id).toLocaleString()}.`);
      }
    }

    closeDatabase();
  }
}
