import { useState } from "react";
import Image from "next/image";
import classes from "./books.module.css";
import { Button, Modal, notification } from "antd";
import { useUser } from "@clerk/nextjs";

function BookItem({ props, fetchData }) {
  const {
    _id,
    bookName,
    bookDescription,
    bookAuthor,
    numberOfPages,
    bookImageLink,
    bookHolder,
    waitList,
  } = props;

  const [alert, setAlert] = useState(null);

  async function requestBookHandler(bookData) {
    const response = await fetch("/api/books/requestBook", {
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

  async function releaseBookHandler(bookData) {
    const response = await fetch("/api/books/releaseBook", {
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

  const { user } = useUser();

  const authUserEmail = user.primaryEmailAddress.emailAddress;

  let link = bookImageLink;

  if (!bookImageLink || bookImageLink === "") {
    link =
      "https://github.com/Belyayev/kolibri/blob/main/Images/NoImage.png?raw=true";
  }

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  let holding = false;
  if (
    waitList &&
    waitList.filter((item) => item.requestedBy === authUserEmail).length > 0
  ) {
    holding = true;
  }

  return (
    <>
      {alert && notification.open({ placement: "topLeft", message: alert })}
      <Modal
        closable={false}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button
            key="submit"
            type="primary"
            danger={holding}
            onClick={() =>
              holding
                ? releaseBookHandler({ _id, authUserEmail })
                : requestBookHandler({ _id, authUserEmail })
            }
          >
            {holding ? "Отказаться" : "Заказать"}
          </Button>,
          <Button key="back" onClick={handleCancel}>
            Закрыть
          </Button>,
        ]}
      >
        <div className={classes.bookitemModal}>
          {bookHolder === authUserEmail && (
            <div className={classes.iHold}>Данная книга сейчас у меня</div>
          )}
          <div className={classes.bookTitleModal}>{bookName}</div>
          <Image
            src={link}
            alt=""
            title=""
            width="100%"
            height="100%"
            layout="responsive"
            objectFit="contain"
          />
          {bookAuthor && (
            <div className={classes.bookAuthor}>Автор: {bookAuthor}</div>
          )}
          <div className={classes.bookDescriptionModal}>{bookDescription}</div>
          {bookHolder ? (
            <div className={classes.notAvailable}>Книга на руках</div>
          ) : (
            <div>
              {waitList && waitList.length > 0 ? (
                <div className={classes.reserved}>Зарезервирована</div>
              ) : (
                <div className={classes.available}>Книга доступна</div>
              )}
            </div>
          )}
          {numberOfPages && (
            <div className={classes.pages}>Страниц: {numberOfPages}</div>
          )}
        </div>
      </Modal>
      <div className={classes.bookitem}>
        <div className={classes.bookTitle}>{bookName}</div>
        <Image
          onClick={showModal}
          src={link}
          alt=""
          title=""
          width="100%"
          height="100%"
          layout="responsive"
          objectFit="contain"
          style={{ cursor: "pointer" }}
        />
        {bookAuthor && (
          <div className={classes.bookAuthor}>Автор: {bookAuthor}</div>
        )}
        <div className={classes.bookDescription}>{bookDescription}</div>
        {bookHolder ? (
          <div className={classes.notAvailable}>Книга на руках</div>
        ) : (
          <div>
            {waitList && waitList.length > 0 ? (
              <div className={classes.reserved}>Зарезервирована</div>
            ) : (
              <div className={classes.available}>Книга доступна</div>
            )}
          </div>
        )}
        {numberOfPages && (
          <div className={classes.pages}>Страниц: {numberOfPages}</div>
        )}
      </div>
    </>
  );
}

export default BookItem;
