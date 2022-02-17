import React from "react";
import { NavLink } from "react-router-dom";

import "./Header.css";

const Header = () => {
    return (
        <header className="header">
            <h1 className="header-logo">Book Barn</h1>
            <NavLink to="/" className="header-link header-link-first">
                Home
            </NavLink>
            <NavLink to="/add-book" className="header-link">
                Add Book
            </NavLink>
        </header>
    );
};

export default Header;
