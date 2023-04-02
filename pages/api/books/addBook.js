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
      message: "Book name is required",
    });
    return;
  }

  const client = await connectToDatabase();

  const db = client.db();

  const existingUser = await db.collection("users").findOne({ email: email });

  if (existingUser && existingUser.isAdmin) {
    res.status(422).json({ message: "Only administrators can add new books." });
    client.close();
    return;
  }

  const result = await db.collection("books").insertOne({
    bookName,
    bookDescription,
    bookAuthor,
    numberOfPages,
    bookImageLink,
    bookHolder: null,
    waitingList: [],
  });

  res.status(201).json({ message: "Book was added!" });
  client.close();
}

export default addBook;
