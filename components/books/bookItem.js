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

  if (!bookImageLink || bookImageLink === "") {
    link = "https://imgtr.ee/images/2023/04/02/Uh9aQ.png";
  }
  return (
    <div className={classes.bookitem}>
      <div className={classes.bookTitle}>{bookName}</div>
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
  );
}

export default BookItem;
