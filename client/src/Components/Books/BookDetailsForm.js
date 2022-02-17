import React, { useState } from "react";
import BookGenreSelect from "./BookGenreSelect";
import BookInput from "./BookInput";

const BookDetailsForm = ({ book: bookProp, handleBookSubmission }) => {
    const [book, setBook] = useState({
        title: bookProp ? bookProp.title : "",
        author: bookProp ? bookProp.author : "",
        publisher: bookProp ? bookProp.publisher : "",
        genre: bookProp ? bookProp.genre : "",
        year: bookProp ? bookProp.year : 2020,
        imageUrl: bookProp ? bookProp.image_url : "",
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        setBook({
            ...book,
            [e.target.name]: e.target.value,
        });
    };

    const validateInput = () => {
        const { title, author, publisher, genre } = book;
        const errors = {};
        if (!title) {
            errors.title = "Title must not be blank!";
        }

        if (!author) {
            errors.author = "Author must not be blank!";
        }

        if (!publisher) {
            errors.publisher = "Publisher must not be blank!";
        }

        if (!genre) {
            errors.genre = "A genre must be selected!";
        }

        if (JSON.stringify(errors) !== "{}") {
            setErrors(errors);
            return false;
        }

        setErrors({});
        return true;
    };

    const handleSubmit = (e) => {
        if (validateInput()) {
            e.target.disabled = true;
            const bookInfo = { ...book };

            for (const [key, value] of Object.entries(bookInfo)) {
                if (typeof value === "string") {
                    bookInfo[key] = value.trim();
                }
            }

            handleBookSubmission(bookInfo);
        }
    };

    return (
        <div className="book-form">
            <BookInput
                label="Title"
                value={book.title}
                error={errors.title}
                name="title"
                onValueChange={handleInputChange}
            />
            <BookInput
                label="Author (separate multiple authors with a comma)"
                value={book.author}
                error={errors.author}
                name="author"
                onValueChange={handleInputChange}
            />
            <BookInput
                label="Publisher"
                value={book.publisher}
                error={errors.publisher}
                name="publisher"
                onValueChange={handleInputChange}
            />
            <BookGenreSelect
                value={book.genre}
                error={errors.genre}
                onValueChange={handleInputChange}
            />
            <BookInput
                label="Year"
                value={book.year}
                error={errors.year}
                name="year"
                type="number"
                onValueChange={handleInputChange}
            />
            <BookInput
                label="Image URL"
                value={book.imageUrl}
                error={errors.imageUrl}
                name="imageUrl"
                onValueChange={handleInputChange}
            />
            <button className="book-submit" onClick={handleSubmit}>
                Save Book
            </button>
        </div>
    );
};
export default BookDetailsForm;
