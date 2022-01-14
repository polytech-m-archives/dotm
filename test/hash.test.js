const query = require('../utils/query');
const connector = require('../utils/connector');
const { DateTime } = require('luxon');

require('dotenv').config();

describe('test hashtags entries without project parameter', () => {
  let db;

  beforeAll(async () => {
    db = await connector.getDatabase();
    const collection = db.collection('projects');
    await collection.deleteMany({});

    await query.createProject('jest-test', db);
    await query.addEntry('jest-test', DateTime.now(), 15, 'Working on my #project', ['project'], db);
    await query.addEntry('jest-test', DateTime.now(), 50, 'Working on my #mongodb #project', ['mongodb', 'project'], db);
  });

  it('should return nothing with non existing hashtag', async () => {
    let entries;
    
    try {
      entries = await query.findHashtags('null', null, db);
    } catch(err) {
      expect(err).toBe(undefined);
    }

    expect(await entries.hasNext()).toBe(false);
  });

  it('should return one result from the database', async () => {
    let cursor;
   
    try {
      cursor = await query.findHashtags('project', null, db);
    } catch(err) {
      expect(err).toBe(undefined);
    }

    const entries = await cursor.toArray();
    expect(entries.length).toBe(1);
  });

  it('should return the correct number of minutes for #project', async () => {
    let cursor;
   
    try {
      cursor = await query.findHashtags('project', null, db);
    } catch(err) {
      expect(err).toBe(undefined);
    }

    let count = 0;
    if (await cursor.hasNext()) {
      count = (await cursor.next()).count;
    }

    expect(count).toBe(65);
  });

  it('should return the correct number of minutes for #mongodb', async () => {
    let cursor;
   
    try {
      cursor = await query.findHashtags('mongodb', null, db);
    } catch(err) {
      expect(err).toBe(undefined);
    }

    let count = 0;
    if (await cursor.hasNext()) {
      count = (await cursor.next()).count;
    }

    expect(count).toBe(50);
  });

  afterAll(() => {
    connector.closeDatabase()
  });
})
