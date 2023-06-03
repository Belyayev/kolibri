import classes from "./books.module.css";
import React, { useEffect, useState } from "react";
import { Input } from "antd";
import BookItem from "./bookItem";

async function getBooks() {
  const response = await fetch("/api/books/getBooks", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  const data = await response.json();

  return data;
}

function Books() {
  const [books, setBooks] = useState([]);

  const onSearch = (text) => {
    const booksToDisplay = structuredClone(
      books.filter(
        (book) =>
          book.bookName.toLowerCase().includes(text.toLowerCase()) ||
          (book.bookAuthor &&
            book.bookAuthor.toLowerCase().includes(text.toLowerCase()))
      )
    );

    setFilteredBooks(booksToDisplay);
  };

  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    getBooks().then((data) => {
      setBooks(data);
      setFilteredBooks(data);
    });
  }, []);

  // const onChange = (value) => {
  //   form.setFieldsValue(books.filter((book) => book._id === value)[0]);
  //   setSelectedBook(books.filter((book) => book._id === value)[0]);
  // };

  return (
    <div className={classes.booksPage}>
      <div className={classes.booksTitle}>Книги в нашей библиотеке</div>
      <Input
        allowClear
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Поиск книги по названию или автору"
      />
      <div className={classes.booksList}>
        {filteredBooks &&
          filteredBooks.map((book) => (
            <div key={book._id}>
              <BookItem props={book} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default Books;
