import React from "react";
import BookItem from "./BookItem";

const BookItems = ({ user, books, onBookUpdate }) => {
    const bookItems = books.map((book) => (
        <BookItem
            user={user}
            book={book}
            onBookUpdate={onBookUpdate}
            key={book.id}
        />
    ));
    return <div className="book-items">{bookItems}</div>;
};

export default BookItems;
