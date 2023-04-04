import React, { useState } from "react";
import { notification, Tabs } from "antd";
import classes from "./adminPage.module.css";
import { AddBookForm } from "./addBookForm";
import { UpdateBookForm } from "./updateBookForm";

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

  const bookTabs = [
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

  return (
    <div className={classes.adminPage}>
      {alert && notification.open({ placement: "topLeft", message: alert })}
      <div className={classes.adminTitle}>Панель Администратора</div>
      <Tabs defaultActiveKey="1" items={bookTabs} />
    </div>
  );
}

export default AdminPage;
