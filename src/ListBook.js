import React from "react";
import Book from "./Book";

const ListBook = (props) => {
  return (
    <div className="bookshelf">
      {props.shelves.map((s) => (
        <div key={s.id}>
          <h2 className="bookshelf-title">{s.shelfDisplayName}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {props.books
                .filter((f) => f.shelf === s.shelfName)
                .map((book) => (
                  <li key={book.id}>
                    <Book
                      book={book}
                      shelves={props.shelves}
                      onUpdateBookShelf={props.onUpdateBookShelf}
                    />
                  </li>
                ))}
            </ol>
          </div>
        </div>
      ))}
      <div className="open-search">
        <a href="/search" name="true">
          Add a book
        </a>
      </div>
    </div>
  );
};

export default ListBook;
