import classes from "./books.module.css";
import React, { useEffect, useState } from "react";
import { Input, Switch } from "antd";
import { useUser } from "@clerk/nextjs";
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
  const { user } = useUser();

  const authUserEmail = user.primaryEmailAddress.emailAddress;

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

  const fetchData = React.useCallback(async () => {
    getBooks().then((data) => {
      setBooks(data);
      setFilteredBooks(data);
    });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onMyBooksChange = (checked) => {
    if (checked) {
      setFilteredBooks(
        books.filter((book) => book.bookHolder === authUserEmail)
      );
    } else {
      setFilteredBooks(books);
    }
  };

  const onFreeBooksChange = (checked) => {
    if (checked) {
      setFilteredBooks(books.filter((book) => !book.bookHolder));
    } else {
      setFilteredBooks(books);
    }
  };

  return (
    <div className={classes.booksPage}>
      <div className={classes.booksTitle}>Книги в нашей библиотеке</div>
      <div>
        || всего книг: {books.length} || на руках:{" "}
        {books.filter((book) => book.bookHolder).length} || в листе ожидания:{" "}
        {
          books.filter((book) => book.waitList && book.waitList.length > 0)
            .length
        }{" "}
        || свободных:{" "}
        {books.filter((book) => !book.bookHolder && !book.waitList).length} ||
      </div>
      <div>
        <Switch style={{ margin: "0.5rem" }} onChange={onMyBooksChange} />
        <span>Показывать только мои книги</span>
        <Switch style={{ margin: "0.5rem" }} onChange={onFreeBooksChange} />
        <span>Показывать только свободные книги</span>
      </div>
      <Input
        allowClear
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Поиск книги по названию или автору"
      />
      <div className={classes.booksList}>
        {filteredBooks &&
          filteredBooks.map((book) => (
            <div key={book._id}>
              <BookItem props={book} fetchData={fetchData} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default Books;
