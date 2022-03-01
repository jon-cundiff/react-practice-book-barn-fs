import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import fetchBook from "../util/fetchBook";

import "./BookDetails.css";

const BookDetailsPage = () => {
    const navigate = useNavigate();
    const params = useParams();
    const user = useSelector((state) => state.user);

    const [book, setBook] = useState(null);

    useEffect(() => {
        const getBook = async () => {
            try {
                const fetchedBook = await fetchBook(params.bookId);
                setBook(fetchedBook);
            } catch {
                navigate("/");
            }
        };

        if (!book) {
            getBook();
        }
    }, [navigate, params, book]);

    if (!book) {
        return (
            <div>
                <h2>Getting book info...</h2>
            </div>
        );
    }

    let allowUpdate = false;
    if (user) {
        allowUpdate = user.id === book.user_id;
    }

    const imageSrc = book.image_url
        ? book.image_url
        : "/images/unavailable.gif";

    return (
        <div className="book-details">
            <h1>{book.title}</h1>
            <div className="book-details-image">
                <img src={imageSrc} alt={book.title} />
            </div>

            <p>
                <b>Author(s):</b>
                {book.author}
            </p>
            <p>
                <b>Publisher:</b>
                {book.publisher}
            </p>
            <p>
                <b>Year Released:</b>
                {book.year}
            </p>
            {allowUpdate && (
                <NavLink to={`/book/${book.id}/update`}>
                    <button>Update Book</button>
                </NavLink>
            )}
        </div>
    );
};

export default BookDetailsPage;
