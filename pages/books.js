import { getSession } from "next-auth/client";

import Books from "../components/books/books";

function BooksPage() {
  return <Books />;
}

export default BooksPage;
