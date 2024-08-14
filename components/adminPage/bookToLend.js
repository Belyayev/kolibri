import React, { useState } from "react";
import { Button, notification } from "antd";
import { useUser } from "@clerk/nextjs";
import classes from "./adminPage.module.css";

export const BookToLend = ({ book, fetchData }) => {
  const [alert, setAlert] = useState(null);

  const { user } = useUser();
  const authUserEmail = user.primaryEmailAddress.emailAddress;

  async function assignBookHandler(bookData) {
    const response = await fetch("/api/books/assignBook", {
      method: "PATCH",
      body: JSON.stringify(bookData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    setAlert(data.message);
    fetchData();
    return data;
  }

  async function clearBookHandler(bookData) {
    const response = await fetch("/api/books/clearBook", {
      method: "PATCH",
      body: JSON.stringify(bookData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    setAlert(data.message);
    fetchData();
    return data;
  }

  return (
    <div className={classes.bookToLendWrapper}>
      {alert && notification.open({ placement: "topLeft", message: alert })}
      <div key={book._id}>
        <div className={classes.bookToLendTitle}>{book.bookName}</div>
        {book.bookHolder && (
          <div className={classes.bookToLendSubTitle}>
            на руках: {book.bookHolder} (выдана: {book.dateBorrowed})
          </div>
        )}
        <div className={classes.bookToLendEmailList}>
          {book.waitList.map((email) => (
            <div className={classes.bookToLendItem} key={email.requestedBy}>
              <div>
                [ {email.requestedDate} ] : {email.requestedBy}
              </div>
              <div>
                <Button
                  type="link"
                  onClick={() =>
                    clearBookHandler({
                      authUserEmail,
                      _id: book._id,
                      clearUser: email.requestedBy,
                    })
                  }
                >
                  Очистить
                </Button>
                <Button
                  onClick={() =>
                    assignBookHandler({
                      authUserEmail,
                      _id: book._id,
                      bookHolder: email.requestedBy,
                    })
                  }
                >
                  Выдать
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
