import React, { useEffect, useState } from "react";
import { Form, Input, Select, Button, InputNumber } from "antd";
import classes from "./adminForm.module.css";

const { TextArea } = Input;

async function getBooks() {
  const response = await fetch("/api/books/getBooks", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  const data = await response.json();
  console.log(data);
  return data;
}

export const UpdateBookForm = (props) => {
  const [books, setBooks] = useState([]);

  let bookList = [];

  books.map((book, index) =>
    bookList.push({
      value: book._id,
      label: `${index}. ${book.bookName}`,
    })
  );

  useEffect(() => {
    getBooks().then((data) => setBooks(data));
  }, []);

  const [form] = Form.useForm();

  function submitHandler(values) {
    const {
      _id,
      bookName,
      bookAuthor,
      numberOfPages,
      bookDescription,
      bookComment,
      bookImageLink,
    } = values;

    props.onUpdateBook({
      _id,
      bookName,
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
            showSearch
            placeholder="Выберете книгу для редактирования"
            options={bookList}
            onChange={onChange}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
          >
            Название книги
          </Select>
        </Form.Item>
        <Form.Item label="На руках">
          <Select>
            <Select.Option showSearch value="demo">
              Имя Студента
            </Select.Option>
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
        <Form.Item wrapperCol={{ offset: 19 }}>
          <Button type="primary" htmlType="submit">
            Обновить
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
