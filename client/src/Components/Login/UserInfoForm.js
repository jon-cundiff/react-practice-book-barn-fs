import React, { useState } from "react";
import FormInput from "../Common/FormInput";

const UserInfoForm = ({ login, handleAuthSubmit }) => {
    const [auth, setAuth] = useState({
        username: "",
        password: "",
        email: "",
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        setAuth({
            ...auth,
            [e.target.name]: e.target.value,
        });
    };

    const validateInput = () => {
        const { username, password, email } = auth;
        const errors = {};
        if (!username) {
            errors.username = "Username must not be blank!";
        }

        if (!password) {
            errors.password = "Password must not be blank!";
        }
        if (!email && !login) {
            errors.email = "Email must not be blank!";
        }

        if (JSON.stringify(errors) !== "{}") {
            setErrors(errors);
            return false;
        }

        setErrors({});
        return true;
    };

    const handleSubmit = () => {
        if (validateInput()) {
            handleAuthSubmit(auth);
        }
    };

    return (
        <div className="auth-form">
            <FormInput
                label="Username"
                value={auth.username}
                error={errors.username}
                name="username"
                onValueChange={handleInputChange}
            />
            <FormInput
                label="Password"
                value={auth.password}
                error={errors.password}
                name="password"
                type="password"
                onValueChange={handleInputChange}
            />
            {!login && (
                <FormInput
                    label="Email"
                    value={auth.email}
                    error={errors.email}
                    name="email"
                    type="email"
                    onValueChange={handleInputChange}
                />
            )}
            <button className="book-submit" onClick={handleSubmit}>
                {login ? "Login" : "Sign Up"}
            </button>
        </div>
    );
};

export default UserInfoForm;
