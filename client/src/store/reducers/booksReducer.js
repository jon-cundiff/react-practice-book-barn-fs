import * as actionTypes from "../actions/actionTypes";

const initialState = {
    allBooks: [],
    selectedBook: [],
    userBooks: [],
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
        default:
            return state;
    }
};

export default reducer;
