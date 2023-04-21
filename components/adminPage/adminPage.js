import React, { useState } from "react";
import { notification, Tabs } from "antd";
import classes from "./adminPage.module.css";
import { AddBookForm } from "./addBookForm";
import { UpdateBookForm } from "./updateBookForm";
import { AddStudentForm } from "./addStudentForm";
import { UpdateStudentForm } from "./updateStudentForm";
import { StudentList } from "./StudentList";
import { AddEventForm } from "./addEventForm";
import { UpdateEventForm } from "./updateEventForm";
import { EventList } from "./EventList";
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

  async function addEventHandler(eventData) {
    const response = await fetch("/api/events/addEvent", {
      method: "POST",
      body: JSON.stringify(eventData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    setAlert(data.message);
    return data;
  }

  async function updateEventHandler(studentData) {
    const response = await fetch("/api/events/updateEvent", {
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

  async function deleteEventHandler(_id) {
    const response = await fetch("/api/events/deleteEvent", {
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
    {
      key: "3",
      label: `Список Студентов`,
      children: <StudentList />,
    },
  ];

  const eventsTabs = [
    {
      key: "1",
      label: `Добавить запись`,
      children: <AddEventForm onAddEvent={addEventHandler} />,
    },
    {
      key: "2",
      label: `Редактировать запись`,
      children: (
        <UpdateEventForm
          onUpdateEvent={updateEventHandler}
          onDeleteEvent={deleteEventHandler}
        />
      ),
    },
    {
      key: "3",
      label: `Список записей`,
      children: <EventList />,
    },
  ];

  return (
    <div className={classes.adminPage}>
      {alert && notification.open({ placement: "topLeft", message: alert })}
      <div className={classes.adminTitle}>Панель Администратора</div>
      <Tabs className={classes.tab} defaultActiveKey="1" items={booksTabs} />
      <Tabs className={classes.tab} defaultActiveKey="1" items={studentsTabs} />
      <Tabs className={classes.tab} defaultActiveKey="1" items={eventsTabs} />
    </div>
  );
}

export default AdminPage;
