import React, { useState } from "react";
import Link from "next/link";
import { Button, Result, notification, Tabs } from "antd";
import classes from "./adminPage.module.css";
import { AddBookForm } from "./addBookForm";
import { UpdateBookForm } from "./updateBookForm";
import { LendBookForm } from "./lendBookForm";
import { HandedBooks } from "./handedBooks";
import { AddStudentForm } from "./addStudentForm";
import { useUser } from "@clerk/nextjs";
import { UpdateStudentForm } from "./updateStudentForm";
import { StudentList } from "./StudentList";
import { AddEventForm } from "./addEventForm";
import { UpdateEventForm } from "./updateEventForm";
import { EventList } from "./EventList";
import { AddBookCategoryForm } from "./addBookCategoryForm";
import { UpdateBookCategoryForm } from "./updateBookCategoryForm";
import { BookCategoryList } from "./BookCategoryList";
import { administrators } from "../../constants";

function AdminPage() {
  const { user } = useUser();
  const authUserEmail = user.primaryEmailAddress.emailAddress;
  const [alert, setAlert] = useState(null);

  if (!administrators.includes(authUserEmail)) {
    return (
      <Result
        status="403"
        title="НЕТ ДОСТУПА"
        subTitle="Доступ к этой странице запрещен."
        extra={
          <Link passHref href="/">
            <Button type="primary">Back Home</Button>
          </Link>
        }
      />
    );
  }

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

  async function updateEventHandler(eventData) {
    const response = await fetch("/api/events/updateEvent", {
      method: "PATCH",
      body: JSON.stringify(eventData),
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

  async function addCategoryHandler(categoryData) {
    const response = await fetch("/api/bookCategories/addBookCategory", {
      method: "POST",
      body: JSON.stringify(categoryData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    setAlert(data.message);
    return data;
  }

  async function updateCategoryHandler(categoryData) {
    const response = await fetch("/api/bookCategories/updateBookCategory", {
      method: "PATCH",
      body: JSON.stringify(categoryData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    setAlert(data.message);
    return data;
  }

  async function deleteCategoryHandler(_id) {
    const response = await fetch("/api/bookCategories/deleteBookCategory", {
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
      label: `Добавить`,
      children: <AddBookForm onAddBook={addBookHandler} />,
    },
    {
      key: "2",
      label: `Редактировать`,
      children: (
        <UpdateBookForm
          onUpdateBook={updateBookHandler}
          onDeleteBook={deleteBookHandler}
        />
      ),
    },
    {
      key: "3",
      label: `Запросили`,
      children: (
        <LendBookForm
          onUpdateBook={updateBookHandler}
          onDeleteBook={deleteBookHandler}
        />
      ),
    },
    {
      key: "4",
      label: `На Руках`,
      children: <HandedBooks />,
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
      label: `Редактировать`,
      children: (
        <UpdateStudentForm
          onUpdateStudent={updateStudentHandler}
          onDeleteStudent={deleteStudentHandler}
        />
      ),
    },
    {
      key: "3",
      label: `Список`,
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
      label: `Редактировать`,
      children: (
        <UpdateEventForm
          onUpdateEvent={updateEventHandler}
          onDeleteEvent={deleteEventHandler}
        />
      ),
    },
    {
      key: "3",
      label: `Список`,
      children: <EventList />,
    },
  ];

  const categoriesTabs = [
    {
      key: "1",
      label: `Добавить Категорию`,
      children: <AddBookCategoryForm onAddCategory={addCategoryHandler} />,
    },
    {
      key: "2",
      label: `Редактировать`,
      children: (
        <UpdateBookCategoryForm
          onUpdateCategory={updateCategoryHandler}
          onDeleteCategory={deleteCategoryHandler}
        />
      ),
    },
    {
      key: "3",
      label: `Список`,
      children: <BookCategoryList />,
    },
  ];

  return (
    <div className={classes.adminPage}>
      {alert && notification.open({ placement: "topLeft", message: alert })}
      <div className={classes.adminTitle}>Панель Администратора</div>
      <Tabs className={classes.tab} defaultActiveKey="1" items={booksTabs} />
      <Tabs className={classes.tab} defaultActiveKey="1" items={studentsTabs} />
      <Tabs className={classes.tab} defaultActiveKey="1" items={eventsTabs} />
      <Tabs
        className={classes.tab}
        defaultActiveKey="1"
        items={categoriesTabs}
      />
    </div>
  );
}

export default AdminPage;
