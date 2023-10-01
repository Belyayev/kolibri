import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../lib/db";

async function updateBookCategory(req, res) {
  if (req.method !== "PATCH") {
    return;
  }

  const data = req.body;

  const { _id, bookCategory } = data;

  if (!bookCategory) {
    res.status(422).json({
      message: "Название категории обязательно!",
    });
    return;
  }

  const client = await connectToDatabase();

  const bookCategoryCollection = client.db().collection("bookCategories");

  const book = await bookCategoryCollection.findOne(ObjectId(_id));

  if (!book) {
    res.status(404).json({ message: "Категория не найдена :(" });
    client.close();
    return;
  }

  const result = await bookCategoryCollection.updateOne(
    { _id: ObjectId(_id) },
    {
      $set: {
        bookCategory: bookCategory,
      },
    }
  );

  res.status(201).json({ message: "Категория отредактирована!" });
  client.close();
}

export default updateBookCategory;
