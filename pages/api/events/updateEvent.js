import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../lib/db";

async function updateEvent(req, res) {
  if (req.method !== "PATCH") {
    return;
  }

  const data = req.body;

  const { _id, eventName, eventDate, eventDescription } = data;

  if (!eventName) {
    res.status(422).json({
      message: "Название обязательно!",
    });
    return;
  }

  if (!eventDate) {
    res.status(422).json({
      message: "Дата обязательна!",
    });
    return;
  }

  const client = await connectToDatabase();

  const eventsCollection = client.db().collection("events");

  const book = await eventsCollection.findOne(ObjectId(_id));

  if (!book) {
    res.status(404).json({ message: "Запись не найдена :(" });
    client.close();
    return;
  }

  const result = await eventsCollection.updateOne(
    { _id: ObjectId(_id) },
    {
      $set: {
        eventName: eventName,
        eventDate: eventDate,
        eventDescription: eventDescription,
      },
    }
  );

  res.status(201).json({ message: "Запись отредактирована!" });
  client.close();
}

export default updateEvent;
