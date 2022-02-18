import React from "react";
import { NavLink } from "react-router-dom";

const UnauthLinks = () => {
    return (
        <>
            <NavLink to="/login" className="header-link header-link-first">
                Login
            </NavLink>
            <NavLink to="/signup" className="header-link">
                Sign up
            </NavLink>
        </>
    );
};

export default UnauthLinks;
