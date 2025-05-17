import { ApplicationError } from "../../../common/errors/application-error";
import { Db, MongoClient } from "mongodb";

let client: MongoClient
let db: Db

export async function connect(uri: string, dbName: string) {
  client = new MongoClient(uri);
  await client.connect();
  db = client.db(dbName);
};

export function getDb() {
  if (!db)  throw new ApplicationError('MongoDB not connected');
  return db;
}