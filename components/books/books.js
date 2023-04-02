import classes from "./books.module.css";
import React, { useEffect, useState } from "react";
import BookItem from "./bookItem";

async function getBooks() {
  const response = await fetch("/api/books/getBooks", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }
  console.log(data);
  return data;
}

function Books() {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    getBooks().then((data) => setBooks(data));
  }, []);
  return (
    <div className={classes.booksPage}>
      <div className={classes.booksTitle}>Книги в нашей библиотеке</div>
      <div className={classes.booksList}>
        {books &&
          books.map((book) => (
            <div key={book._id}>
              <BookItem props={book} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default Books;
