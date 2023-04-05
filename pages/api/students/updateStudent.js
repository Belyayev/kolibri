import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../lib/db";

async function updateStudent(req, res) {
  if (req.method !== "PATCH") {
    return;
  }

  const data = req.body;

  const { _id, studentName, phoneNumber, emailAddress, notes } = data;

  if (!studentName) {
    res.status(422).json({
      message: "Имя обязательно",
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

  const studentsCollection = client.db().collection("students");

  const book = await studentsCollection.findOne(ObjectId(_id));

  if (!book) {
    res.status(404).json({ message: "Студент не найден :(" });
    client.close();
    return;
  }

  const result = await studentsCollection.updateOne(
    { _id: ObjectId(_id) },
    {
      $set: {
        studentName,
        phoneNumber,
        emailAddress,
        notes,
      },
    }
  );

  res.status(201).json({ message: "Студент отредактирован!" });
  client.close();
}

export default updateStudent;
