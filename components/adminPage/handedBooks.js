import React, { useEffect, useState } from "react";
import classes from "./adminPage.module.css";

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

async function getStudents() {
  const response = await fetch("/api/students/getStudents", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  const data = await response.json();
  return data;
}

export const HandedBooks = () => {
  const [books, setBooks] = useState([]);
  const [students, setStudents] = useState([]);

  let bookList = [];
  let studentList = [];

  const handedBooks = [];

  console.log(books);
  console.log(students);

  if (books) {
    handedBooks = books.filter((book) => book.bookHolder !== null);
  }

  books.map((book, index) =>
    bookList.push({
      value: book._id,
      label: `${index}. ${book.bookName}`,
    })
  );

  students.map((student, index) =>
    studentList.push({
      value: student.emailAddress,
      label: `${index}. ${student.studentName} (${student.emailAddress})`,
    })
  );

  const fetchData = React.useCallback(async () => {
    getBooks().then((data) => setBooks(data));
    getStudents().then((data) => setStudents(data));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className={classes.addBookWrapper}>
      <div className={classes.addBookTitle}>Список книг на руках</div>
      {handedBooks &&
        handedBooks.map((book) => (
          <div className={classes.handedBook} key={book._id}>
            <div className={classes.handedBookRow}>
              <strong>{book.bookName}</strong>
              <span>выдана: {book.dateBorrowed}</span>
            </div>
            <div className={classes.handedBookRow}>
              <span>
                {students.filter(
                  (student) => student.emailAddress === book.bookHolder
                )[0] &&
                  students.filter(
                    (student) => student.emailAddress === book.bookHolder
                  )[0].studentName}
              </span>
              {book.bookHolder}
            </div>
          </div>
        ))}
    </div>
  );
};
