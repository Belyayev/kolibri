import { connectToDatabase } from "../../../lib/db";

async function addStudent(req, res) {
  if (req.method !== "POST") {
    return;
  }

  const data = req.body;

  const { authUserEmail, studentName, phoneNumber, emailAddress, notes } = data;

  if (!studentName) {
    res.status(422).json({
      message: "Имя студента обязательно",
    });
    return;
  }

  if (!emailAddress) {
    res.status(422).json({
      message: "Адрес электронной почты обязателен",
    });
    return;
  }

  const client = await connectToDatabase();

  const administrators = ["sachyk81@hotmail.com", "4xgood@gmail.com"];

  if (!administrators.includes(authUserEmail)) {
    res
      .status(422)
      .json({ message: "Только администраторы могут добавлять студентов" });
    client.close();
    return;
  }

  const db = client.db();

  const result = await db.collection("students").insertOne({
    studentName,
    phoneNumber,
    emailAddress,
    notes,
  });

  res.status(201).json({ message: "Студент добавлен!" });
  client.close();
}

export default addStudent;
