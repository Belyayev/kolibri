import { useRef } from "react";
import classes from "./adminPage.module.css";

function AddBookForm(props) {
  const bookName = useRef();
  const bookDescription = useRef();
  const bookAuthor = useRef();
  const numberOfPages = useRef();
  const bookImageLink = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredBookName = bookName.current.value;
    const enteredBookDescription = bookDescription.current.value;
    const enteredAuthor = bookAuthor.current.value;
    const enteredNumberOfPages = numberOfPages.current.value;
    const enteredBookImageLink = bookImageLink.current.value;

    props.onAddBook({
      bookName: enteredBookName,
      bookDescription: enteredBookDescription,
      bookAuthor: enteredAuthor,
      numberOfPages: enteredNumberOfPages,
      bookImageLink: enteredBookImageLink,
    });
  }

  return (
    <div className={classes.adminPage}>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="bookName">Название Книги</label>
          <input type="text" id="bookName" ref={bookName} />
        </div>
        <div className={classes.control}>
          <label htmlFor="bookDescription">Описание</label>
          <input type="text" id="bookDescription" ref={bookDescription} />
        </div>
        <div className={classes.control}>
          <label htmlFor="bookAuthor">Автор</label>
          <input type="text" id="bookAuthor" ref={bookAuthor} />
        </div>
        <div className={classes.control}>
          <label htmlFor="pageCount">Количество страниц</label>
          <input type="number" id="pageCount" ref={numberOfPages} />
        </div>
        <div className={classes.control}>
          <label htmlFor="linkToImage">Ссылка на изображение</label>
          <input type="text" id="linkToImage" ref={bookImageLink} />
        </div>
        <div className={classes.action}>
          <button>Добавить Книгу</button>
        </div>
      </form>
    </div>
  );
}

export default AddBookForm;
