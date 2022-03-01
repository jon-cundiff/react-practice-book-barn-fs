import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { logoutUser } from "../../store/actions/actionCreators";

const AuthLinks = ({ name }) => {
    const dispatch = useDispatch();
    return (
        <>
            <NavLink to="/add-book" className="header-link header-link-first">
                Add Book
            </NavLink>
            <NavLink to="/profile" className="header-link">
                {name}
            </NavLink>
            <button onClick={() => dispatch(logoutUser())}>Log Out</button>
        </>
    );
};

export default AuthLinks;
