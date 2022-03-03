import * as actionTypes from "./actionTypes";
import baseUrl from "../../Components/util/baseUrl";

export const setFetchError = (hasError) => {
    return {
        type: actionTypes.SET_FETCH_ERROR,
        payload: hasError,
    };
};

export const getBooks = (genre) => async (dispatch) => {
    const searchUrl = genre ? `${baseUrl}/genre/${genre}` : baseUrl;
    const booksResp = await fetch(searchUrl);
    const booksJson = await booksResp.json();
    dispatch(setBooks(booksJson.books));
};

export const setBooks = (books) => {
    return {
        type: actionTypes.SET_BOOKS,
        payload: books,
    };
};

export const getUserBooks = (token) => async (dispatch) => {
    const searchUrl = `${baseUrl}/profile`;
    const booksResp = await fetch(searchUrl, {
        headers: {
            token: token,
        },
    });
    const booksJson = await booksResp.json();
    dispatch(setUserBooks(booksJson.books));
};

export const setUserBooks = (books) => {
    return {
        type: actionTypes.SET_USER_BOOKS,
        payload: books,
    };
};

export const getBook = (bookId) => async (dispatch) => {
    const bookResp = await fetch(`${baseUrl}/book/${bookId}`);
    if (bookResp.status === 200) {
        const book = await bookResp.json();
        dispatch(setBook(book.book));
    } else {
        dispatch(setFetchError(true));
    }
};

export const setBook = (book) => {
    return {
        type: actionTypes.SET_BOOK,
        payload: book,
    };
};

export const authenticateUser = (user) => {
    return {
        type: actionTypes.AUTHENTICATE_USER,
        payload: user,
    };
};

export const logoutUser = () => {
    return {
        type: actionTypes.LOGOUT_USER,
    };
};

export const addBookToCart = (book) => {
    return {
        type: actionTypes.ADD_ITEM,
        payload: book,
    };
};

export const addBookToFavorites = (book) => {
    return {
        type: actionTypes.ADD_FAVORITE,
        payload: book,
    };
};
