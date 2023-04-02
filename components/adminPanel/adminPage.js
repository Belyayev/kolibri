import BookForm from "./bookForm";
import classes from "./adminPage.module.css";
import React from "react";

function AdminPanel() {
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
    <section className={classes.profile}>
      <h1>Панель Администратора</h1>
      <BookForm onAddBook={addBookHandler} />
    </section>
  );
}

export default AdminPanel;
