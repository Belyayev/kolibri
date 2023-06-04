import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../lib/db";

async function deleteStudent(req, res) {
  if (req.method !== "DELETE") {
    return;
  }

  const id = req.body._id;

  const client = await connectToDatabase();

  const studentsCollection = client.db().collection("students");

  const book = await studentsCollection.findOne(ObjectId(id));

  if (!book) {
    res.status(404).json({ message: "Студент не найден :(" });
    client.close();
    return;
  }

  const result = await studentsCollection.deleteOne({
    _id: ObjectId(id),
  });

  res.status(201).json({ message: "Студент уделен!" });
  client.close();
}

export default deleteStudent;
