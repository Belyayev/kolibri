import { getSession } from "next-auth/client";
import { connectToDatabase } from "../../../lib/db";

async function addEvent(req, res) {
  if (req.method !== "POST") {
    return;
  }

  const data = req.body;

  const { eventName, eventDate, eventTime, eventImageLink, eventDescription } =
    data;

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

  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: "Not authenticated!" });
    return;
  }

  const userEmail = session.user.email;

  const administrators = ["sachyk81@hotmail.com", "4xgood@gmail.com"];

  if (!administrators.includes(userEmail)) {
    res.status(422).json({
      message: "Только администраторы могут добавлять записи в календарь",
    });
    client.close();
    return;
  }

  const db = client.db();

  const result = await db.collection("events").insertOne({
    eventName: eventName,
    eventDate: eventDate,
    eventTime: eventTime,
    eventImageLink: eventImageLink,
    eventDescription: eventDescription,
  });

  res.status(201).json({ message: "Записаь в календарь добавлена!" });
  client.close();
}

export default addEvent;
