import { connectToDatabase } from "../../../lib/db";

async function getBooks(req, res) {
  const client = await connectToDatabase();

  const db = client.db();

  const books = await db.collection("books").find().toArray();

  res.status(201).json(books);

  client.close();
}

export default getBooks;
