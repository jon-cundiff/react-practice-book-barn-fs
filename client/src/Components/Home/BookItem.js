import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import baseUrl from "../util/baseUrl";
import { addBookToCart, setBook } from "../../store/actions/actionCreators";
import FavoriteButton from "./FavoriteButton";

const BookItem = ({ book, onBookUpdate }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    let allowDelete = false;

    if (user) {
        allowDelete = user.id === book.user_id;
    }

    const handleAddToCart = () => {
        dispatch(addBookToCart(book));
    };

    const handleDeleteBook = async () => {
        const body = {
            id: book.id,
        };

        try {
            await fetch(`${baseUrl}/delete-book`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify(body),
            });

            onBookUpdate();
        } catch {}
    };

    const imageSrc = book.image_url
        ? book.image_url
        : "/images/unavailable.gif";

    return (
        <div className="book-item" key={book.id}>
            <div className="book-item-image">
                <img src={imageSrc} alt={book.title} />
            </div>
            <div className="book-info">
                <p>{book.title}</p>
            </div>
            {user && (
                <>
                    <button
                        className="book-button book-button-add"
                        onClick={handleAddToCart}
                    >
                        Add to Cart
                    </button>
                    <FavoriteButton book={book} />
                </>
            )}

            <div className="book-buttons">
                <NavLink to={`/book/${book.id}`} className="book-link">
                    <button
                        className="book-button book-button-details"
                        onClick={() => dispatch(setBook(book))}
                    >
                        Details
                    </button>
                </NavLink>
                {allowDelete && (
                    <button
                        className="book-button book-button-delete"
                        onClick={handleDeleteBook}
                    >
                        Delete
                    </button>
                )}
            </div>
        </div>
    );
};

export default BookItem;
