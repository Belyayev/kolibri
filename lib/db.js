import { MongoClient } from "mongodb";
require("dotenv").config();

export async function connectToDatabase() {
  const client = await MongoClient.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  return client;
}
