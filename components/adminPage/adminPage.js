import { AddBookForm } from "./addBookForm";
import classes from "./adminPage.module.css";
import React, { useState } from "react";
import { notification } from "antd";

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

  return (
    <div className={classes.adminPage}>
      {alert && notification.open({ message: alert })}
      <div className={classes.adminTitle}>Панель Администратора</div>
      <AddBookForm onAddBook={addBookHandler} />
    </div>
  );
}

export default AdminPage;
