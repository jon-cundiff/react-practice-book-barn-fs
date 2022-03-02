import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import UserInfoForm from "./UserInfoForm";
import baseUrl from "../util/baseUrl";
import { authenticateUser } from "../../store/actions/actionCreators";

import "./Auth.css";

const Signup = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector(
        (state) => state.auth.isAuthenticated
    );

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    const handleSignupSubmit = async (userInfo) => {
        try {
            const userResp = await fetch(`${baseUrl}/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userInfo),
            });

            if (userResp.status !== 200) {
                throw new Error("Username Taken");
            }

            const userResult = await userResp.json();
            navigate("/");
            dispatch(authenticateUser(userResult));
        } catch (err) {
            console.log(err);
            setError("Username taken");
        }
    };

    return (
        <div className="auth-container">
            <h1>Sign up</h1>
            {error && <p className="error-message">{error}</p>}
            <UserInfoForm handleAuthSubmit={handleSignupSubmit} />
        </div>
    );
};

export default Signup;
