import React from "react";
import { NavLink } from "react-router-dom";

const AuthLinks = ({ logout, name }) => {
    return (
        <>
            <NavLink to="/add-book" className="header-link header-link-first">
                Add Book
            </NavLink>
            <NavLink to="/profile" className="header-link">
                {name}
            </NavLink>
            <button onClick={logout}>Log Out</button>
        </>
    );
};

export default AuthLinks;
