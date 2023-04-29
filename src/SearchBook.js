import * as BooksAPI from "./BooksAPI";
import { useState } from "react";
import Book from "./Book";

const SearchBook = (props) => {
  const [query, setQuery] = useState("");
  const [resultSearchBooks, setResultSearchBooks] = useState([]);

  const updateQuery = (query) => {
    setQuery(query.trim());
    const searchBooks = async () => {
      const res = await BooksAPI.search(query.trim(), 10);
      setResultSearchBooks(props.books.concat(res));
      console.log(resultSearchBooks);
    };
    searchBooks();
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <a href="/" className="close-search">
          Close
        </a>
        <div className="search-books-input-wrapper">
          <input
            value={query}
            onChange={(event) => updateQuery(event.target.value)}
            type="text"
            placeholder="Search by title, author, or ISBN"
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {query === ""
            ? []
            : resultSearchBooks && resultSearchBooks.length > 0
            ? resultSearchBooks.map((book) => {
                return (
                  <li key={book.id}>
                    <Book
                      book={book}
                      shelves={props.shelves}
                      onUpdateBookShelf={props.onUpdateBookShelf}
                    />
                  </li>
                );
              })
            : []}
        </ol>
      </div>
    </div>
  );
};
export default SearchBook;
