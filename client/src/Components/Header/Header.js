import React from "react";
import { NavLink } from "react-router-dom";
import AuthLinks from "./AuthLinks";
import UnauthLinks from "./UnauthLinks";

import "./Header.css";

const Header = ({ user, logout }) => {
    const headerLinks = user ? (
        <AuthLinks logout={logout} name={user.username} />
    ) : (
        <UnauthLinks />
    );
    return (
        <header className="header">
            <h1 className="header-logo">Book Barn</h1>
            <NavLink to="/" className="header-link">
                Home
            </NavLink>
            {headerLinks}
        </header>
    );
};

export default Header;
