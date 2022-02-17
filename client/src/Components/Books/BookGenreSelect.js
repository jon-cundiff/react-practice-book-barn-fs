import React from "react";
import GenreOptions from "../Common/GenreOptions";

const BookGenreSelect = ({ value, onValueChange, error }) => {
    const selectClass = error ? "error-input" : "";
    return (
        <div className="book-input">
            <h4>Genre</h4>
            <select
                name="genre"
                value={value}
                className={selectClass}
                onChange={onValueChange}
            >
                <option value="">Select Genre</option>
                <GenreOptions />
            </select>
            {error && <p className="error-text">{error}</p>}
        </div>
    );
};

export default BookGenreSelect;
