const query = require('../utils/query');
const connector = require('../utils/connector');
const { DateTime } = require('luxon');

require('dotenv').config();

const today = DateTime.fromFormat(DateTime.now().toFormat('MM-dd-yyyy'), 'MM-dd-yyyy');

describe('test daily report entries without project', () => {
  let db;

  beforeAll(async () => {
    db = await connector.getDatabase();
    const collection = db.collection('projects');
    await collection.deleteMany({});

    await query.createProject('jest-test-report', db);
    await query.createProject('jest-test-report-2', db);
    await query.addEntry('jest-test-report', DateTime.now(), 15, 'Working on my #project', [], db);
    await query.addEntry('jest-test-report-2', DateTime.now().minus({ day: 1 }), 50, 'Working on my #mongodb #fun', [], db);
  });

  it('should return two result from the database', async () => {
    let cursor;
   
    try {
      cursor = await query.findDailyReport(null, db);
    } catch(err) {
      expect(err).toBe(undefined);
    }

    const entries = await cursor.toArray();
    expect(entries.length).toBe(2);
  });

  it('should return the correct number of minutes', async () => {
    let cursor;
   
    try {
      cursor = await query.findDailyReport(null, db);
    } catch(err) {
      expect(err).toBe(undefined);
    }

    let count = 0;
    while (await cursor.hasNext()) {
      count += (await cursor.next()).count;
    }

    expect(count).toBe(65);
  });

  afterAll(async () => {
    const collection = db.collection('projects');
    await collection.deleteMany({});
    connector.closeDatabase();
  });
});

describe('test daily report entries with project', () => {
  let db;

  beforeAll(async () => {
    db = await connector.getDatabase();
    const collection = db.collection('projects');
    await collection.deleteMany({});

    await query.createProject('jest-test-report-2', db);
    await query.createProject('jest-test-report-2-2', db);
    await query.addEntry('jest-test-report-2', DateTime.now(), 15, 'Working on my #project', [], db);
    await query.addEntry('jest-test-report-2', DateTime.now().minus({ day: 1 }), 100, 'Working on my #project', [], db);
    await query.addEntry('jest-test-report-2-2', DateTime.now().minus({ day: 1 }), 50, 'Working on my #mongodb #fun', [], db);
  });

  it('should return two result from the database', async () => {
    let cursor;
   
    try {
      cursor = await query.findDailyReport('jest-test-report-2', db);
    } catch(err) {
      expect(err).toBe(undefined);
    }

    const entries = await cursor.toArray();
    expect(entries.length).toBe(2);
  });

  it('should return the correct number of minutes', async () => {
    let cursor;
   
    try {
      cursor = await query.findDailyReport('jest-test-report-2', db);
    } catch(err) {
      expect(err).toBe(undefined);
    }

    let count = 0;
    while (await cursor.hasNext()) {
      count += (await cursor.next()).count;
    }

    expect(count).toBe(115);
  });

  afterAll(async () => {
    const collection = db.collection('projects');
    await collection.deleteMany({});
    connector.closeDatabase();
  });
});
