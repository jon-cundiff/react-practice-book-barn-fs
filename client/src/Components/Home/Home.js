import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "../../store/actions/actionCreators";
import GenreOptions from "../Common/GenreOptions";
import BookItems from "./BookItems";

import "./Home.css";

const Home = () => {
    const dispatch = useDispatch();
    const books = useSelector((state) => state.books.allBooks);

    const handleGenreChange = (e) => {
        dispatch(getBooks(e.target.value));
    };

    useEffect(() => {
        dispatch(getBooks());
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
