import { connectToDatabase } from "../../../lib/db";

async function addBook(req, res) {
  if (req.method !== "POST") {
    return;
  }

  const data = req.body;

  const {
    authUserEmail,
    bookName,
    bookDescription,
    bookAuthor,
    numberOfPages,
    bookImageLink,
  } = data;

  if (!bookName) {
    res.status(422).json({
      message: "Название книги обязательно",
    });
    return;
  }

  const client = await connectToDatabase();

  const administrators = ["sachyk81@hotmail.com", "4xgood@gmail.com"];

  if (!administrators.includes(authUserEmail)) {
    res
      .status(422)
      .json({ message: "Только администраторы могут добавлять книги" });
    client.close();
    return;
  }

  const db = client.db();

  const result = await db.collection("books").insertOne({
    bookName,
    bookDescription,
    bookAuthor,
    numberOfPages,
    bookImageLink,
    bookHolder: null,
    waitingList: [],
  });

  res.status(201).json({ message: "Книга добавлена!" });
  client.close();
}

export default addBook;
