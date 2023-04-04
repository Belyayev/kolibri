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

  const onChange = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: "1",
      label: `Добавить Книгу`,
      children: <AddBookForm onAddBook={addBookHandler} />,
    },
    {
      key: "2",
      label: `Редактировать Книгу`,
      children: <UpdateBookForm onAddBook={addBookHandler} />,
    },
  ];

  return (
    <div className={classes.adminPage}>
      {alert && notification.open({ message: alert })}
      <div className={classes.adminTitle}>Панель Администратора</div>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
}

export default AdminPage;
