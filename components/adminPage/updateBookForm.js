import React, { useEffect, useState } from "react";
import { Form, Input, Select, Button, InputNumber } from "antd";
import { useUser } from "@clerk/nextjs";
import classes from "./adminPage.module.css";

const { TextArea } = Input;

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

export const UpdateBookForm = (props) => {
  const [books, setBooks] = useState([]);
  const [students, setStudents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedBook, setSelectedBook] = useState({});

  let bookList = [];
  let studentList = [];
  let bookCategoriesList = [];

  const { user } = useUser();

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

  categories.map((category, index) =>
    bookCategoriesList.push({
      value: category._id,
      label: `${index}. ${category.bookCategory} `,
    })
  );

  const fetchData = React.useCallback(async () => {
    getBooks().then((data) => setBooks(data));
    getStudents().then((data) => setStudents(data));
    getBookCategories().then((data) => setCategories(data));
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
      bookCategory,
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
      bookCategory,
      bookDescription,
      bookComment,
      bookAuthor,
      numberOfPages,
      bookImageLink,
    });
    form.resetFields();
  }

  const onChange = (value) => {
    form.setFieldsValue(books.filter((book) => book._id === value)[0]);
    setSelectedBook(books.filter((book) => book._id === value)[0]);
  };

  return (
    <div className={classes.addBookWrapper}>
      <div className={classes.addBookTitle}>Редактировать книгу</div>
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
        onFinish={submitHandler}
      >
        <Form.Item label="ID" name="_id">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Книга">
          <Select
            allowClear
            showSearch
            onChange={onChange}
            placeholder="Выберете книгу для редактирования"
            options={bookList}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
          >
            Название книги
          </Select>
        </Form.Item>
        <Form.Item label="Категория" name="bookCategory">
          <Select
            allowClear
            showSearch
            placeholder="Выберете категорию"
            options={bookCategoriesList}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
          />
        </Form.Item>
        <Form.Item label="Выдана" name="dateBorrowed">
          <input
            className={classes.datePicker}
            type="date"
            value={selectedBook.dateBorrowed ? selectedBook.dateBorrowed : ""}
          />
        </Form.Item>
        <Form.Item label="На руках" name="bookHolder">
          <Select
            allowClear
            showSearch
            placeholder="Имя студента, получившего книгу"
            options={studentList}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
          >
            Имя Студента
          </Select>
        </Form.Item>
        <Form.Item label="Название" name="bookName">
          <Input />
        </Form.Item>
        <Form.Item label="Автор" name="bookAuthor">
          <Input />
        </Form.Item>
        <Form.Item label="Страниц" name="numberOfPages">
          <InputNumber />
        </Form.Item>
        <Form.Item label="Описание" name="bookDescription">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item label="Коммент." name="bookComment">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item label="Картинка" name="bookImageLink">
          <Input />
        </Form.Item>
        <Form.Item className={classes.formRow}>
          <Button
            type="default"
            className={classes.deleteBook}
            onClick={() => {
              props.onDeleteBook(selectedBook._id);
              form.resetFields();
            }}
          >
            Удалить Книгу
          </Button>
          <Button type="primary" htmlType="submit">
            Обновить
          </Button>
        </Form.Item>
      </Form>
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
