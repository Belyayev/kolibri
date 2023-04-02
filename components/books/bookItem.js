import Image from "next/image";
import classes from "./books.module.css";

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

  if (bookImageLink === "") {
    link = "https://imgtr.ee/images/2023/04/02/UAVGz.jpg";
  }
  return (
    <div className={classes.bookitem}>
      <Image
        src={link}
        alt=""
        title=""
        width="100%"
        height="100%"
        layout="responsive"
        objectFit="contain"
      />
      <div className={classes.bookTitle}>{bookName}</div>
      <div className={classes.bookAuthor}>
        Автор: {bookAuthor} Страниц: {numberOfPages}
      </div>
      <div>{bookDescription}</div>
      {bookHolder ? <div>Книга на руках</div> : <div>Книга доступна</div>}
    </div>
  );
}

export default BookItem;
