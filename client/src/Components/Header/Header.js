import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import AuthLinks from "./AuthLinks";
import UnauthLinks from "./UnauthLinks";

import "./Header.css";

const Header = () => {
    const user = useSelector((state) => state.user);
    const headerLinks = user ? (
        <AuthLinks name={user.username} />
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
