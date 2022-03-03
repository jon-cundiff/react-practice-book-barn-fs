import React, { useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBook } from "../../store/actions/actionCreators";

import "./BookDetails.css";

const BookDetailsPage = () => {
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const books = useSelector((state) => state.books);

    const { selectedBook: book, fetchError } = books;

    useEffect(() => {
        if (fetchError) {
            navigate("/");
        } else if (!book || book.id !== params.bookId) {
            dispatch(getBook(params.bookId));
        }
    }, [navigate, params, book, dispatch, fetchError]);

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
