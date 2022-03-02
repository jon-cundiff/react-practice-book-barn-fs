import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import BookDetailsForm from "./BookDetailsForm";
import baseUrl from "../util/baseUrl";

import "./Books.css";

const AddBookPage = () => {
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();

    const submitBook = async (book) => {
        try {
            await fetch(`${baseUrl}/new-book`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    token: user.token,
                },
                body: JSON.stringify(book),
            });
        } finally {
            navigate("/");
        }
    };

    useEffect(() => {
        if (!user) {
            navigate("/");
        }
    }, [user, navigate]);

    return (
        <div className="form-container">
            <h1>Add Book</h1>
            <BookDetailsForm handleBookSubmission={submitBook} />
        </div>
    );
};

export default AddBookPage;
