import React, { useEffect, useState } from "react";
import { Form, Input, Select, Button, InputNumber } from "antd";
import { useUser } from "@clerk/nextjs";
import { BookToLend } from ".//bookToLend";
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

export const LendBookForm = (props) => {
  const [books, setBooks] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedBook, setSelectedBook] = useState({});

  let bookList = [];
  let studentList = [];

  const { user } = useUser();

  const booksWithRequest = [];

  if (books) {
    booksWithRequest = books.filter(
      (book) => book.waitList && book.waitList.length > 0
    );
  }

  const authUserEmail = user.primaryEmailAddress.emailAddress;

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

  const [form] = Form.useForm();

  function submitHandler(values) {
    const {
      _id,
      dateBorrowed,
      bookHolder,
      bookName,
      bookAuthor,
      numberOfPages,
      bookDescription,
      bookComment,
      bookImageLink,
    } = values;

    props.onUpdateBook({
      authUserEmail,
      _id,
      dateBorrowed,
      bookHolder,
      bookName,
      bookDescription,
      bookComment,
      bookAuthor,
      numberOfPages,
      bookImageLink,
    });
    form.resetFields();
  }

  return (
    <div className={classes.addBookWrapper}>
      <div className={classes.addBookTitle}>Список запросов на книги</div>
      {booksWithRequest &&
        booksWithRequest.map((book) => (
          <div key={book._id}>
            <BookToLend fetchData={fetchData} book={book} />
          </div>
        ))}
      <div>
        {selectedBook.waitList && selectedBook.waitList.length > 0 && (
          <div>Книгу запросили:</div>
        )}
        {selectedBook.waitList &&
          selectedBook.waitList.map((item) => (
            <div key={item.requestedBy}>
              {item.requestedDate} : {item.requestedBy}
            </div>
          ))}
      </div>
    </div>
  );
};
