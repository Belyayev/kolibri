import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../lib/db";
import { administrators } from "../../../constants";

async function deleteBook(req, res) {
  if (req.method !== "DELETE") {
    return;
  }

  const id = req.body._id;

  const client = await connectToDatabase();

  const booksCollection = client.db().collection("books");

  const book = await booksCollection.findOne(ObjectId(id));

  if (!book) {
    res.status(404).json({ message: "Книга не найдена :(" });
    client.close();
    return;
  }

  const result = await booksCollection.deleteOne({
    _id: ObjectId(id),
  });

  res.status(201).json({ message: "Книга уделена!" });
  client.close();
}

export default deleteBook;
