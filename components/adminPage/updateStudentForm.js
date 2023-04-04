import React, { useEffect, useState } from "react";
import { Form, Input, Select, Button, InputNumber } from "antd";
import classes from "./adminPage.module.css";

const { TextArea } = Input;

async function getStudents() {
  const response = await fetch("/api/students/getStudents", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  const data = await response.json();
  console.log(data);
  return data;
}

export const UpdateStudentForm = (props) => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState({});

  let studentList = [];

  students.map((book, index) =>
    studentList.push({
      value: book._id,
      label: `${index}. ${book.bookName}`,
    })
  );

  useEffect(() => {
    getStudents().then((data) => setStudents(data));
  }, []);

  const [form] = Form.useForm();

  function submitHandler(values) {
    const { _id, studentName, phoneNumber, emailAddress, notes } = values;

    props.onUpdateBook({
      _id,
      studentName,
      phoneNumber,
      emailAddress,
      notes,
    });
    form.resetFields();
  }

  const onChange = (value) => {
    form.setFieldsValue(students.filter((student) => student._id === value)[0]);
    setSelectedStudent(students.filter((student) => student._id === value)[0]);
  };

  return (
    <div className={classes.addBookWrapper}>
      <div className={classes.addBookTitle}>
        Редактировать студента (пока не работает)
      </div>
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
            placeholder="Выберете книгу для редактирования"
            options={studentList}
            onChange={onChange}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
          >
            Название книги
          </Select>
        </Form.Item>
        <Form.Item label="На руках" name="bookHolder">
          <Select
            allowClear
            showSearch
            options={[
              {
                value: "jack",
                label: "Jack",
              },
              {
                value: "lucy",
                label: "Lucy",
              },
              {
                value: "tom",
                label: "Tom",
              },
            ]}
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
        <Form.Item wrapperCol={{ offset: 19 }}>
          <Button type="primary" htmlType="submit">
            Обновить
          </Button>
        </Form.Item>
      </Form>
      <Button
        type="default"
        className={classes.deleteBook}
        onClick={() => {
          props.onDeleteBook(selectedStudent._id);
          form.resetFields();
        }}
      >
        Удалить Книгу
      </Button>
    </div>
  );
};
