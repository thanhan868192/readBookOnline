import * as BooksAPI from "./BooksAPI";
import { useState } from "react";
import Book from "./Book";

const SearchBook = (props) => {
  const [query, setQuery] = useState("");
  const [resultSearchBooks, setResultSearchBooks] = useState([]);

  const updateQuery = (query) => {
    setQuery(query);
  };

  const searchBooks = async () => {
    const res = await BooksAPI.search(query.trim(), 100);
    console.log(props.books.concat(res));
    setResultSearchBooks(props.books.concat(res));
  };

  const debounce = (func, timeout = 500) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  };

  const processChange = debounce(() => searchBooks());

  const showingBooks =
    query === ""
      ? []
      : resultSearchBooks.filter(
          (item) =>
            item?.title?.toLowerCase().includes(query.toLowerCase()) ||
            item?.authors
              ?.toString()
              .toLowerCase()
              .indexOf(query.toLowerCase()) > -1
        );

  console.log(showingBooks);

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <a href="/" className="close-search">
          Close
        </a>
        <div className="search-books-input-wrapper">
          <input
            value={query}
            onKeyUp={processChange}
            onChange={(event) => updateQuery(event.target.value)}
            type="text"
            placeholder="Search by title, author, or ISBN"
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {showingBooks.map((book) => {
            return (
              <li key={book.id}>
                <Book
                  book={book}
                  shelves={props.shelves}
                  onUpdateBookShelf={props.onUpdateBookShelf}
                />
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};
export default SearchBook;
