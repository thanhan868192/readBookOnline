import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import * as BooksAPI from "./BooksAPI";
import ListBook from "./ListBook";
import SearchBook from "./SearchBook";

function App() {
  let navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const shelves = [
    {
      id: 1,
      shelfName: "currentlyReading",
      shelfDisplayName: "Currently Reading",
    },
    { id: 2, shelfName: "wantToRead", shelfDisplayName: "Want To Read" },
    { id: 2, shelfName: "read", shelfDisplayName: "Read" },
  ];
  useEffect(() => {
    const getBooks = async () => {
      const res = await BooksAPI.getAll();
      setBooks(res);
      console.log(res);
    };

    getBooks();
  }, []);

  const updateBookShelf = (book, shelf) => {
    book.shelf = shelf;
    BooksAPI.update(book, shelf).then(() => {
      setBooks([...books.filter((b) => b.id !== book.id), book]);
    });
    // navigate("/");
  };

  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={
            <ListBook
              books={books}
              shelves={shelves}
              onUpdateBookShelf={updateBookShelf}
            />
          }
        />
        <Route
          path="/search"
          element={
            <SearchBook
              books={books}
              shelves={shelves}
              onUpdateBookShelf={updateBookShelf}
            />
          }
        />
        {/* <Route path="/details/:id" element={<BookDetails />} /> */}
      </Routes>
    </div>
  );
}

export default App;
