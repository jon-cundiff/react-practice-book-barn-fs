import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBookToFavorites } from "../../store/actions/actionCreators";

const FavoriteButton = ({ book }) => {
    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.favorites.favorites);
    const favoritesIds = favorites.map((favorite) => favorite.id);
    const isFavorited = favoritesIds.includes(book.id);
    return (
        <button
            className={`book-button book-button-favorite ${
                isFavorited ? "added" : ""
            }`}
            onClick={() => dispatch(addBookToFavorites(book))}
        >
            {isFavorited ? "Already in Favorites" : "Add to Favorites"}
        </button>
    );
};

export default FavoriteButton;
