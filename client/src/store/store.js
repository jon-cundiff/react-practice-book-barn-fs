import * as actionTypes from "./actions/actionTypes";

const initialState = {
    cart: [],
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
        case actionTypes.ADD_ITEM:
            return {
                ...state,
                cart: [...state.cart, action.payload],
            };
        default:
            return state;
    }
};

export default reducer;
