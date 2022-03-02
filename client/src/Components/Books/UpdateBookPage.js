import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import BookDetailsForm from "./BookDetailsForm";
import baseUrl from "../util/baseUrl";
import fetchBook from "../util/fetchBook";

import "./Books.css";

const UpdateBookPage = () => {
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();
    const params = useParams();
    const [book, setBook] = useState(null);

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
        }
    }, [navigate, params, book, user]);

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
