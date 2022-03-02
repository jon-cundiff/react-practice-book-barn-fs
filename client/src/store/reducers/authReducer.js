import * as actionTypes from "../actions/actionTypes";

const initialState = {
    isAuthenticated: false,
    user: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTHENTICATE_USER:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
            };
        case actionTypes.LOGOUT_USER:
            return {
                ...state,
                isAuthenticated: false,
                user: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;
