import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../lib/db";
import moment from "moment";

async function requestBook(req, res) {
  if (req.method !== "PATCH") {
    return;
  }

  const data = req.body;

  const { _id, authUserEmail } = data;

  const client = await connectToDatabase();

  const booksCollection = client.db().collection("books");

  const book = await booksCollection.findOne(ObjectId(_id));

  if (!book) {
    res.status(404).json({ message: "Книга не найдена :(" });
    client.close();
    return;
  }

  let waitList = [];

  if (book.waitList) {
    waitList = book.waitList;
  }

  if (waitList.filter((requestor) => requestor.authUserEmail !== authUserEmail))
    waitList.push({
      requestedBy: authUserEmail,
      requestedDate: moment().format("YYYY-MM-DD"),
    });

  const result = await booksCollection.updateOne(
    { _id: ObjectId(_id) },
    {
      $set: {
        waitList,
      },
    }
  );

  res.status(201).json({ message: "Запрос отправлен!" });
  client.close();
}

export default requestBook;
