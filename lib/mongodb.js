import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URL;
const dbName = process.env.DB_NAME || 'yanush_cars';

let cachedClient = null;

export async function getDb() {
  if (cachedClient) return cachedClient.db(dbName);
  const client = new MongoClient(uri);
  await client.connect();
  cachedClient = client;
  return client.db(dbName);
}
