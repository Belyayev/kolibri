import { connectToDatabase } from "../../../lib/db";

async function getBookCategories(req, res) {
  const client = await connectToDatabase();

  const db = client.db();

  const categories = await db.collection("bookCategories").find().toArray();

  res.status(201).json(categories);

  client.close();
}

export default getBookCategories;
