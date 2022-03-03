import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import authReducer from "./reducers/authReducer";
import bookReducer from "./reducers/booksReducer";
import cartReducer from "./reducers/cartReducer";
import favoritesReducer from "./reducers/favoritesReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    books: bookReducer,
    cart: cartReducer,
    favorites: favoritesReducer,
});

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;
