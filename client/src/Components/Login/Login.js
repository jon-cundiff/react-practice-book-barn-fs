import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import UserInfoForm from "./UserInfoForm";
import baseUrl from "../util/baseUrl";
import { authenticateUser } from "../../store/actions/actionCreators";

import "./Auth.css";

const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

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
            localStorage.setItem("jwt", JSON.stringify(userResult));
            dispatch(authenticateUser(userResult));
            navigate("/");
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
