import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../lib/db";
import { administrators } from "../../../constants";
import moment from "moment";

async function updateBook(req, res) {
  if (req.method !== "PATCH") {
    return;
  }

  const data = req.body;

  const {
    authUserEmail,
    _id,
    dateBorrowed,
    bookHolder,
    bookName,
    bookDescription,
    bookComments,
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

  if (!administrators.includes(authUserEmail)) {
    res
      .status(422)
      .json({ message: "Только администраторы могут добавлять книги" });
    client.close();
    return;
  }

  const booksCollection = client.db().collection("books");

  const book = await booksCollection.findOne(ObjectId(_id));

  if (!book) {
    res.status(404).json({ message: "Книга не найдена :(" });
    client.close();
    return;
  }

  let waitList = book.waitList;

  if (bookHolder) {
    const updatedWaitList = waitList.filter(
      (item) => item.requestedBy !== bookHolder
    );
    waitList = updatedWaitList;
  }

  const result = await booksCollection.updateOne(
    { _id: ObjectId(_id) },
    {
      $set: {
        dateBorrowed: moment(dateBorrowed).format("YYYY-MM-DD"),
        bookHolder,
        bookName,
        bookDescription,
        waitList,
        bookComments,
        bookAuthor,
        numberOfPages,
        bookImageLink,
      },
    }
  );

  res.status(201).json({ message: "Книга отредактирована!" });
  client.close();
}

export default updateBook;
