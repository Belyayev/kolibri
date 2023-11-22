import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../lib/db";
import { administrators } from "../../../constants";
import moment from "moment";

async function assignBook(req, res) {
  if (req.method !== "PATCH") {
    return;
  }

  const data = req.body;

  const { authUserEmail, _id, bookHolder } = data;

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
        dateBorrowed: moment().format("YYYY-MM-DD"),
        bookHolder,
      },
    }
  );

  res.status(201).json({ message: "Книга выдана на руки!" });
  client.close();
}

export default assignBook;
