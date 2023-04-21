import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../lib/db";

async function deleteEvent(req, res) {
  if (req.method !== "DELETE") {
    return;
  }

  const id = req.body._id;

  const client = await connectToDatabase();

  const eventsCollection = client.db().collection("events");

  const event = await eventsCollection.findOne(ObjectId(id));

  if (!event) {
    res.status(404).json({ message: "Запись в календаре не найдена :(" });
    client.close();
    return;
  }

  const result = await eventsCollection.deleteOne({
    _id: ObjectId(id),
  });

  res.status(201).json({ message: "Запись уделена!" });
  client.close();
}

export default deleteEvent;
