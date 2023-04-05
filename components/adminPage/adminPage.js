import React, { useState } from "react";
import { notification, Tabs } from "antd";
import classes from "./adminPage.module.css";
import { AddBookForm } from "./addBookForm";
import { UpdateBookForm } from "./updateBookForm";
import { AddStudentForm } from "./addStudentForm";
import { UpdateStudentForm } from "./updateStudentForm";

function AdminPage() {
  const [alert, setAlert] = useState(null);

  async function addBookHandler(bookData) {
    const response = await fetch("/api/books/addBook", {
      method: "POST",
      body: JSON.stringify(bookData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    setAlert(data.message);
    return data;
  }

  async function updateBookHandler(bookData) {
    const response = await fetch("/api/books/updateBook", {
      method: "PATCH",
      body: JSON.stringify(bookData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    setAlert(data.message);
    return data;
  }

  async function deleteBookHandler(_id) {
    const response = await fetch("/api/books/deleteBook", {
      method: "DELETE",
      body: JSON.stringify({ _id: _id }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    setAlert(data.message);
    return data;
  }

  async function addStudentHandler(studentData) {
    const response = await fetch("/api/students/addStudent", {
      method: "POST",
      body: JSON.stringify(studentData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    setAlert(data.message);
    return data;
  }

  async function updateStudentHandler(studentData) {
    const response = await fetch("/api/students/updateStudent", {
      method: "PATCH",
      body: JSON.stringify(studentData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    setAlert(data.message);
    return data;
  }

  async function deleteStudentHandler(_id) {
    const response = await fetch("/api/students/deleteStudent", {
      method: "DELETE",
      body: JSON.stringify({ _id: _id }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    setAlert(data.message);
    return data;
  }

  const booksTabs = [
    {
      key: "1",
      label: `Добавить Книгу`,
      children: <AddBookForm onAddBook={addBookHandler} />,
    },
    {
      key: "2",
      label: `Редактировать Книгу`,
      children: (
        <UpdateBookForm
          onUpdateBook={updateBookHandler}
          onDeleteBook={deleteBookHandler}
        />
      ),
    },
  ];

  const studentsTabs = [
    {
      key: "1",
      label: `Добавить Студента`,
      children: <AddStudentForm onAddStudent={addStudentHandler} />,
    },
    {
      key: "2",
      label: `Редактировать Студента`,
      children: (
        <UpdateStudentForm
          onUpdateStudent={updateStudentHandler}
          onDeleteStudent={deleteStudentHandler}
        />
      ),
    },
  ];

  return (
    <div className={classes.adminPage}>
      {alert && notification.open({ placement: "topLeft", message: alert })}
      <div className={classes.adminTitle}>Панель Администратора</div>
      <Tabs defaultActiveKey="1" items={booksTabs} />
      <Tabs defaultActiveKey="1" items={studentsTabs} />
    </div>
  );
}

export default AdminPage;
