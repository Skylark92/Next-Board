import { MongoClient } from "mongodb";

let globalWithConnect = global as typeof globalThis & {
  _mongo: Promise<MongoClient>;
};

const url = process.env.DB_URL as string;
const options = {};
let connectDB: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  if (!globalWithConnect._mongo) {
    globalWithConnect._mongo = new MongoClient(url, options).connect();
  }
  connectDB = globalWithConnect._mongo;
} else {
  connectDB = new MongoClient(url, options).connect();
}
export { connectDB };
