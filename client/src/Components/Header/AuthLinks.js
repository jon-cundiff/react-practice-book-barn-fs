import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logoutUser } from "../../store/actions/actionCreators";

const AuthLinks = ({ name }) => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart);
    const handleLogOut = () => {
        localStorage.removeItem("jwt");
        dispatch(logoutUser());
    };
    return (
        <>
            <NavLink to="/add-book" className="header-link header-link-first">
                Add Book
            </NavLink>
            <NavLink to="/profile" className="header-link">
                {name}
            </NavLink>
            <button onClick={handleLogOut}>Log Out</button>
            <h4>Cart ({cart.length})</h4>
        </>
    );
};

export default AuthLinks;
