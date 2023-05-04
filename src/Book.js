const Book = (props) => {
  const handleUpdateBookShelf = (event) => {
    props.onUpdateBookShelf(props.book, event.target.value);
  };

  const showShelves = props.shelves.find(
    (s) => s.shelfName === props.book.shelf
  )
    ? props.shelves.find((s) => s.shelfName === props.book.shelf).shelfName
    : "none";

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${
              props.book.imageLinks ? props.book.imageLinks.smallThumbnail : ""
            })`,
          }}
        ></div>
        <div className="book-shelf-changer">
          <select onChange={handleUpdateBookShelf} value={showShelves}>
            <option value="" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{props.book.title}</div>
      <div className="book-authors"> {props.book?.authors.toString()}</div>
    </div>
  );
};

export default Book;
