const query = require('../utils/query');
const connector = require('../utils/connector');
const { DateTime } = require('luxon');

require('dotenv').config();

const today = DateTime.fromFormat(DateTime.now().toFormat('MM-dd-yyyy'), 'MM-dd-yyyy');

describe('test get entries with time parameter', () => {
  let db;

  beforeAll(async () => {
    db = await connector.getDatabase();
    const collection = db.collection('projects');
    await collection.deleteMany({});

    await query.createProject('jest-test', db);
    await query.addEntry('jest-test', DateTime.now(), 15, 'Working on my #project', [], db);
    await query.addEntry('jest-test', DateTime.now(), 50, 'Working on my #mongodb #fun', [], db);

    await query.createProject('jest-test-2', db);
    await query.addEntry('jest-test-2', DateTime.now(), 25, 'Working on my #project', [], db);
  });

  it('should return nothing with an older date', async () => {
    let entries;
    
    try {
      entries = await query.findEntries(today.minus({ day: 1 }), null, db);
    } catch(err) {
      expect(err).toBe(undefined);
    }

    expect(await entries.hasNext()).toBe(false);
  });

  it('should return one result from the database', async () => {
    let cursor;
   
    try {
      cursor = await query.findEntries(today, null, db);
    } catch(err) {
      expect(err).toBe(undefined);
    }

    const entries = await cursor.toArray();
    expect(entries.length).toBe(1);
  });

  it('should return the correct number of minutes', async () => {
    let cursor;
   
    try {
      cursor = await query.findEntries(today, null, db);
    } catch(err) {
      expect(err).toBe(undefined);
    }

    let count = 0;
    if (await cursor.hasNext()) {
      count = (await cursor.next()).count;
    }

    expect(count).toBe(90);
  });

  afterAll(() => {
    connector.closeDatabase()
  });
});

describe('test get entries with time and project parameters', () => {
  let db;

  beforeAll(async () => {
    db = await connector.getDatabase();
    const collection = db.collection('projects');
    await collection.deleteMany({});

    await query.createProject('jest-test', db);
    await query.addEntry('jest-test', DateTime.now(), 15, 'Working on my #project', [], db);
    await query.addEntry('jest-test', DateTime.now(), 50, 'Working on my #mongodb #fun', [], db);

    await query.createProject('jest-test-2', db);
    await query.addEntry('jest-test-2', DateTime.now(), 25, 'Working on my #project', [], db);
  });

  it('should return nothing with an older date', async () => {
    let entries;
    
    try {
      entries = await query.findEntries(today.minus({ day: 1 }), 'jest-test', db);
    } catch(err) {
      expect(err).toBe(undefined);
    }

    expect(await entries.hasNext()).toBe(false);
  });

  it('should return one result from the database', async () => {
    let cursor;
   
    try {
      cursor = await query.findEntries(today, 'jest-test', db);
    } catch(err) {
      expect(err).toBe(undefined);
    }

    const entries = await cursor.toArray();
    expect(entries.length).toBe(1);
  });

  it('should return the correct number of minutes', async () => {
    let cursor;
   
    try {
      cursor = await query.findEntries(today, 'jest-test', db);
    } catch(err) {
      expect(err).toBe(undefined);
    }

    let count = 0;
    if (await cursor.hasNext()) {
      count = (await cursor.next()).count;
    }

    expect(count).toBe(65);
  });

  afterAll(() => {
    connector.closeDatabase()
  });
});
