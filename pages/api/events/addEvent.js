import { connectToDatabase } from "../../../lib/db";

async function addEvent(req, res) {
  if (req.method !== "POST") {
    return;
  }

  const data = req.body;

  const {
    authUserEmail,
    eventName,
    eventDate,
    eventTime,
    eventImageLink,
    eventDescription,
  } = data;

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

  const administrators = ["sachyk81@hotmail.com", "4xgood@gmail.com"];

  if (!administrators.includes(authUserEmail)) {
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
