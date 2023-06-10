import React, { useState } from "react";
import { Button, notification } from "antd";
import moment from "moment";
import { useUser } from "@clerk/nextjs";
import classes from "./adminPage.module.css";

export const BookToLend = ({ book, fetchData }) => {
  const [alert, setAlert] = useState(null);

  const { user } = useUser();
  const authUserEmail = user.primaryEmailAddress.emailAddress;

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
              <Button
                onClick={() =>
                  updateBookHandler({
                    authUserEmail,
                    _id: book._id,
                    bookName: book.bookName,
                    dateBorrowed: moment().format("YYYY-MM-DD"),
                    bookHolder: email.requestedBy,
                  })
                }
              >
                Выдать
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
