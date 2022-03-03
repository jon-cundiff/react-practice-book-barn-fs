import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BookItems from "./BookItems";

import "./Home.css";
import { getUserBooks } from "../../store/actions/actionCreators";

const Profile = () => {
    const user = useSelector((state) => state.auth.user);
    const books = useSelector((state) => state.books.userBooks);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/");
        } else {
            dispatch(getUserBooks(user.token));
        }
    }, []);

    return (
        <div className="main-container">
            <h1>My Books</h1>
            <BookItems user={user} books={books} />
        </div>
    );
};

export default Profile;
