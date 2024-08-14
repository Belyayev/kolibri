import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../lib/db";
import { administrators } from "../../../constants";
import moment from "moment";

async function clearBook(req, res) {
  if (req.method !== "PATCH") {
    return;
  }

  const data = req.body;

  const { authUserEmail, _id, clearUser } = data;

  const client = await connectToDatabase();

  if (!administrators.includes(authUserEmail)) {
    res.status(422).json({ message: "Только администраторы могут" });
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

  const updatedWaitList = waitList.filter(
    (item) => item.requestedBy !== clearUser
  );
  waitList = updatedWaitList;

  const result = await booksCollection.updateOne(
    { _id: ObjectId(_id) },
    {
      $set: {
        waitList,
      },
    }
  );

  res.status(201).json({ message: "Заброс на книгу удален!" });
  client.close();
}

export default clearBook;
