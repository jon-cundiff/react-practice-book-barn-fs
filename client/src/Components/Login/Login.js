import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserInfoForm from "./UserInfoForm";
import baseUrl from "../util/baseUrl";

import "./Auth.css";

const Login = ({ user, login }) => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    const params = useParams();
    const errorCode = params.errorCode;

    let errorMessage;
    if (error) {
        errorMessage = error;
    } else if (errorCode) {
        errorMessage =
            errorCode === "1"
                ? "Please log in to use this feature"
                : "Session expired. Please log in again.";
    }

    const handleLoginSubmit = async (userInfo) => {
        try {
            const userResp = await fetch(`${baseUrl}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userInfo),
            });

            if (userResp.status !== 200) {
                throw new Error("Failure to log in.");
            }

            const userResult = await userResp.json();
            navigate("/");
            login(userResult);
        } catch (err) {
            console.log(err);
            setError("Error Logging In.");
        }
    };

    return (
        <div className="auth-container">
            <h1>Log in</h1>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <UserInfoForm login handleAuthSubmit={handleLoginSubmit} />
        </div>
    );
};

export default Login;
