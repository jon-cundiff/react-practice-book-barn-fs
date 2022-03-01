import React from "react";
import BookItem from "./BookItem";

const BookItems = ({ books, onBookUpdate }) => {
    const bookItems = books.map((book) => (
        <BookItem book={book} onBookUpdate={onBookUpdate} key={book.id} />
    ));
    return <div className="book-items">{bookItems}</div>;
};

export default BookItems;
