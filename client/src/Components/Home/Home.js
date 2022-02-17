import React, { useEffect, useState } from "react";
import GenreOptions from "../Common/GenreOptions";
import BookItems from "./BookItems";
import baseUrl from "../util/baseUrl";

import "./Home.css";

const Home = () => {
    const [books, setBooks] = useState([]);

    const getBooks = async (genre) => {
        const searchUrl = genre ? `${baseUrl}/genre/${genre}` : baseUrl;
        const booksResp = await fetch(searchUrl);
        const booksJson = await booksResp.json();

        setBooks(booksJson.books);
    };

    const handleGenreChange = (e) => {
        getBooks(e.target.value);
    };

    useEffect(() => {
        getBooks();
    }, []);

    return (
        <div className="main-container">
            <select onChange={handleGenreChange}>
                <option value="">Filter by Genre</option>
                <GenreOptions />
            </select>
            <BookItems books={books} onBookUpdate={getBooks} />
        </div>
    );
};

export default Home;
