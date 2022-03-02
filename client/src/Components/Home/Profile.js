import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import BookItems from "./BookItems";
import baseUrl from "../util/baseUrl";

import "./Home.css";

const Profile = () => {
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const booksFetched = useRef(false);

    const getBooks = useCallback(async () => {
        const searchUrl = `${baseUrl}/profile`;
        const booksResp = await fetch(searchUrl, {
            headers: {
                token: user.token,
            },
        });
        const booksJson = await booksResp.json();
        setBooks(booksJson.books);
    }, [user]);

    useEffect(() => {
        if (!user) {
            navigate("/");
        } else if (!booksFetched.current) {
            booksFetched.current = true;
            getBooks();
        }
    }, [user, navigate, books, getBooks]);

    return (
        <div className="main-container">
            <h1>My Books</h1>
            <BookItems user={user} books={books} onBookUpdate={getBooks} />
        </div>
    );
};

export default Profile;
