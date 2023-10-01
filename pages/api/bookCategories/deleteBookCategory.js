import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../lib/db";

async function deleteBookCategory(req, res) {
  if (req.method !== "DELETE") {
    return;
  }

  const id = req.body._id;

  const client = await connectToDatabase();

  const eventsCollection = client.db().collection("bookCategories");

  const category = await eventsCollection.findOne(ObjectId(id));

  if (!category) {
    res.status(404).json({ message: "Категория не найдена :(" });
    client.close();
    return;
  }

  const result = await eventsCollection.deleteOne({
    _id: ObjectId(id),
  });

  res.status(201).json({ message: "Категория уделена!" });
  client.close();
}

export default deleteBookCategory;
