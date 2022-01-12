const { MongoClient } = require("mongodb");

let client;

const connect = async () => {
  client = new MongoClient(process.env.MONGODB_URL || 'mongodb://localhost');
  await client.connect();
  return client;
}

const getDatabase = async () => {
  const client = await connect();
  return client.db('dotm');
}

const closeDatabase = () => {
  if (client) {
    client.close();
  }
}

module.exports = {
  connect,
  getDatabase,
  closeDatabase,
};
