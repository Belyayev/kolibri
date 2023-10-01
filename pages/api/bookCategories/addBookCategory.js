import { connectToDatabase } from "../../../lib/db";

import { administrators } from "../../../constants";

async function addBookCategory(req, res) {
  if (req.method !== "POST") {
    return;
  }

  const data = req.body;

  const { authUserEmail, bookCategory } = data;

  if (!bookCategory) {
    res.status(422).json({
      message: "Название категории обязательно!",
    });
    return;
  }

  const client = await connectToDatabase();

  if (!administrators.includes(authUserEmail)) {
    res.status(422).json({
      message: "Только администраторы могут добавлять категории",
    });
    client.close();
    return;
  }

  const db = client.db();

  const result = await db.collection("bookCategories").insertOne({
    bookCategory: bookCategory,
  });

  res.status(201).json({ message: "Категория добавлена!" });
  client.close();
}

export default addBookCategory;
