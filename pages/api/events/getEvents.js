import { connectToDatabase } from "../../../lib/db";

async function getEvents(req, res) {
  const client = await connectToDatabase();

  const db = client.db();

  const events = await db.collection("events").find().toArray();

  res.status(201).json(events);

  client.close();
}

export default getEvents;
