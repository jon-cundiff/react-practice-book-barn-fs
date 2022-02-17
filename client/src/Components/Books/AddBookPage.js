import React from "react";
import { useNavigate } from "react-router-dom";
import BookDetailsForm from "./BookDetailsForm";
import baseUrl from "../util/baseUrl";

import "./Books.css";

const AddBookPage = () => {
    const navigate = useNavigate();

    const submitBook = async (book) => {
        try {
            await fetch(`${baseUrl}/new-book`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(book),
            });
        } finally {
            navigate("/");
        }
    };

    return (
        <div className="form-container">
            <h1>Add Book</h1>
            <BookDetailsForm handleBookSubmission={submitBook} />
        </div>
    );
};

export default AddBookPage;
