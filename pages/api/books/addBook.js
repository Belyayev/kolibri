import { getSession } from "next-auth/client";
import { connectToDatabase } from "../../../lib/db";

async function addBook(req, res) {
  if (req.method !== "POST") {
    return;
  }

  const data = req.body;

  const {
    email,
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

  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: "Not authenticated!" });
    return;
  }

  const userEmail = session.user.email;

  const administrators = ["sachyk81@hotmail.com", "4xgood@gmail.com"];

  if (!administrators.includes(userEmail)) {
    res
      .status(422)
      .json({ message: "Только администраторы могут добавлять книги" });
    client.close();
    return;
  }

  const db = client.db();

  const result = await db.collection("books").updateOne({
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
