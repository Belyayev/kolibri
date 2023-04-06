import { MongoClient } from "mongodb";
require("dotenv").config();

export async function connectToDatabase() {
  //   const client = await MongoClient.connect(process.env.MONGO_URI, {
  const client = await MongoClient.connect(
    "mongodb+srv://xcoder:xC0der@gappcluster.ameg5.mongodb.net/kolibri?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  return client;
}
