import { AddBookForm } from "./addBookForm";
import classes from "./adminPage.module.css";
import React from "react";

function AdminPage() {
  async function addBookHandler(bookData) {
    const response = await fetch("/api/books/addBook", {
      method: "POST",
      body: JSON.stringify(bookData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log(data);
  }

  return (
    <div className={classes.adminPage}>
      <div className={classes.adminTitle}>Панель Администратора</div>
      <AddBookForm onAddBook={addBookHandler} />
    </div>
  );
}

export default AdminPage;
