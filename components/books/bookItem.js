import { useState } from "react";
import Image from "next/image";
import classes from "./books.module.css";
import { Button, Modal } from "antd";

function BookItem({ props }) {
  const {
    _id,
    bookName,
    bookDescription,
    bookAuthor,
    numberOfPages,
    bookImageLink,
    bookHolder,
  } = props;

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

  return (
    <>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Закрыть
          </Button>,
        ]}
      >
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
            <div className={classes.available}>Книга доступна</div>
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
          <div className={classes.available}>Книга доступна</div>
        )}
        {numberOfPages && (
          <div className={classes.pages}>Страниц: {numberOfPages}</div>
        )}
      </div>
    </>
  );
}

export default BookItem;
