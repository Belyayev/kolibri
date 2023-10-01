import classes from "./books.module.css";
import React, { useEffect, useState } from "react";
import { Input, Switch, Select } from "antd";
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

async function getBookCategories() {
  const response = await fetch("/api/bookCategories/getBookCategories", {
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

  const [bookCategories, setBookCategories] = useState([]);

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
    getBookCategories().then((data) => {
      setBookCategories(data);
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
      setFilteredBooks(filteredBooks.filter((book) => !book.bookHolder));
    } else {
      setFilteredBooks(books);
    }
  };

  const options = [];
  bookCategories.forEach((category) => {
    options.push({
      value: category._id,
      label: category.bookCategory,
    });
  });

  const handleCategoryFilterChange = (value) => {
    const filteredByCategoryBooks = [];
    books.forEach((book) => {
      value.forEach((id) => {
        if (book.bookCategory === id) {
          filteredByCategoryBooks.push(book);
        }
      });
    });
    if (value.length === 0) {
      filteredByCategoryBooks = books;
    }
    setFilteredBooks(filteredByCategoryBooks);
  };

  return (
    <div className={classes.booksPage}>
      <div className={classes.booksTitle}>Книги в нашей библиотеке</div>
      <div className={classes.booksStats}>
        <div className={classes.booksStatsItem}>всего книг: {books.length}</div>
        <div className={classes.booksStatsItem}>
          на руках: {books.filter((book) => book.bookHolder).length}
        </div>
        <div className={classes.booksStatsItem}>
          в листе ожидания:{" "}
          {
            books.filter((book) => book.waitList && book.waitList.length > 0)
              .length
          }
        </div>
        <div className={classes.booksStatsItem}>
          свободных:{" "}
          {books.filter((book) => !book.bookHolder && !book.waitList).length}
        </div>
      </div>
      <div className={classes.categoryFilter}>
        <span style={{ marginRight: "0.5rem" }}>Категории:</span>{" "}
        <Select
          allowClear
          mode="tags"
          maxTagCount={1}
          style={{
            width: "100%",
          }}
          placeholder="Фильтр по категориям"
          onChange={handleCategoryFilterChange}
          options={options}
        />
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
              <BookItem
                props={book}
                bookCategories={bookCategories}
                fetchData={fetchData}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default Books;
