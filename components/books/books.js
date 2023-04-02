import classes from "./books.module.css";
import React, { useEffect, useState } from "react";

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
    <section className={classes.profile}>
      <h1>Список книг</h1>
      {books &&
        books.map((book, index) => (
          <div key={book.bookName + index}>{book.bookName}</div>
        ))}
    </section>
  );
}

export default Books;
