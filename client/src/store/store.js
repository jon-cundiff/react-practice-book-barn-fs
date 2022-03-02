import { createStore, combineReducers } from "redux";
import authReducer from "./reducers/authReducer";
import cartReducer from "./reducers/cartReducer";
import favoritesReducer from "./reducers/favoritesReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    cart: cartReducer,
    favorites: favoritesReducer,
});

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
