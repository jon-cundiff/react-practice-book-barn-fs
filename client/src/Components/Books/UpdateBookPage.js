import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BookDetailsForm from "./BookDetailsForm";
import baseUrl from "../util/baseUrl";

import "./Books.css";
import { getBook } from "../../store/actions/actionCreators";

const UpdateBookPage = () => {
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const books = useSelector((state) => state.books);
    const { selectedBook: book, fetchError } = books;

    const updateBook = async (bookInfo) => {
        const { id } = book;
        const body = {
            ...bookInfo,
            id,
        };
        try {
            await fetch(`${baseUrl}/update-book`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    token: user.token,
                },
                body: JSON.stringify(body),
            });
        } finally {
            navigate(`/book/${id}`);
        }
    };

    useEffect(() => {
        const bookNotMatched = user && book ? user.id !== book.user_id : false;
        if (!user || bookNotMatched) {
            navigate("/");
        } else {
            if (fetchError) {
                navigate("/");
            } else if (!book || book.id !== params.bookId) {
                dispatch(getBook(params.bookId));
            }
        }
    }, [navigate, params, book, user, fetchError, dispatch]);

    if (!book) {
        return (
            <div>
                <h1>Update Book</h1>
                <h2>Getting book info...</h2>
            </div>
        );
    }

    return (
        <div className="form-container">
            <h1>Update Book</h1>
            <BookDetailsForm book={book} handleBookSubmission={updateBook} />
        </div>
    );
};

export default UpdateBookPage;
