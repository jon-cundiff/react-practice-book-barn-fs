import * as actionTypes from "../actions/actionTypes";

const initialState = {
    allBooks: [],
    selectedBook: [],
    userBooks: [],
    fetchError: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_BOOKS:
            return {
                ...state,
                allBooks: action.payload,
            };
        case actionTypes.SET_USER_BOOKS:
            return {
                ...state,
                userBooks: action.payload,
            };
        case actionTypes.SET_BOOK:
            return {
                ...state,
                selectedBook: action.payload,
            };
        case actionTypes.SET_FETCH_ERROR:
            return {
                ...state,
                fetchError: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;
