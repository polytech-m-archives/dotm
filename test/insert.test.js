const query = require('../utils/query');
const { today } = require('../utils/constant');
const connector = require('../utils/connector');
const { DateTime } = require('luxon');

require('dotenv').config();

describe('test insert entry without comment', () => {
  let db;

  beforeAll(async () => {
    db = await connector.getDatabase();
    const collection = db.collection('projects');
    await collection.deleteMany({});

    await query.createProject('jest-test-insert', db);
  });

  it('should create entry without thrown an error', async () => {
    try {
      await query.addEntry('jest-test-insert', DateTime.now(), 15, null, [], db);
    } catch (err) {
      expect(err).toBe(undefined);
    }
  });

  it('should return the entry from the database', async () => {
    let cursor;
   
    try {
      cursor = await query.findEntries(today, 'jest-test-insert', db);
    } catch(err) {
      expect(err).toBe(undefined);
    }

    const entries = await cursor.toArray();
    expect(entries.length).toBe(1);
  });

  afterAll(async () => {
    const collection = db.collection('projects');
    await collection.deleteMany({});
    connector.closeDatabase();
  });
});

describe('test insert entry with comment', () => {
  let db;

  beforeAll(async () => {
    db = await connector.getDatabase();
    const collection = db.collection('projects');
    await collection.deleteMany({});

    await query.createProject('jest-test-insert', db);
  });

  it('should create entry without thrown an error', async () => {
    try {
      await query.addEntry('jest-test-insert', DateTime.now(), 15, 'Working on my #project', [], db);
    } catch (err) {
      expect(err).toBe(undefined);
    }
  });

  it('should return the entry from the database', async () => {
    let cursor;
   
    try {
      cursor = await query.findEntries(today, 'jest-test-insert', db);
    } catch(err) {
      expect(err).toBe(undefined);
    }

    const entries = await cursor.toArray();
    expect(entries.length).toBe(1);
  });

  afterAll(async () => {
    const collection = db.collection('projects');
    await collection.deleteMany({});
    connector.closeDatabase();
  });
});

describe('test insert entry with comment and hashtags', () => {
  let db;

  beforeAll(async () => {
    db = await connector.getDatabase();
    const collection = db.collection('projects');
    await collection.deleteMany({});

    await query.createProject('jest-test-insert', db);
  });

  it('should create entry without thrown an error', async () => {
    try {
      await query.addEntry('jest-test-insert', DateTime.now(), 15, 'Working on my #project', ['project'], db);
    } catch (err) {
      expect(err).toBe(undefined);
    }
  });

  it('should return the entry from the database', async () => {
    let cursor;
   
    try {
      cursor = await query.findEntries(today, 'jest-test-insert', db);
    } catch(err) {
      expect(err).toBe(undefined);
    }

    const entries = await cursor.toArray();
    expect(entries.length).toBe(1);
  });

  afterAll(async () => {
    const collection = db.collection('projects');
    await collection.deleteMany({});
    connector.closeDatabase();
  });
});
