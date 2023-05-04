const Book = (props) => {
  const handleUpdateBookShelf = (event) => {
    props.onUpdateBookShelf(props.book, event.target.value);
  };

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${props.book.imageLinks.smallThumbnail})`,
          }}
        ></div>
        <div className="book-shelf-changer">
          <select
            onChange={handleUpdateBookShelf}
            // value={
            //   props.shelves.find((s) => s.shelfName === props.book.shelf)
            //     .shelfDisplayName
            // }
          >
            <option value="none" disabled>
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
