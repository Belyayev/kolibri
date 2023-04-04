import { connectToDatabase } from "../../../lib/db";

async function getStudents(req, res) {
  const client = await connectToDatabase();

  const db = client.db();

  const students = await db.collection("students").find().toArray();

  res.status(201).json(students);

  client.close();
}

export default getStudents;
