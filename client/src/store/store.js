import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { authenticateUser } from "./actions/actionCreators";
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

const user = localStorage.getItem("jwt");
if (user) {
    store.dispatch(authenticateUser(JSON.parse(user)));
}

export default store;
