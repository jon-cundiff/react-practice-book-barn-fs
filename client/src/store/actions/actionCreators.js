import * as actionTypes from "./actionTypes";

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
