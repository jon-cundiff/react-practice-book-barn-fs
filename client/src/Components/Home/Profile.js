import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BookItems from "./BookItems";

import "./Home.css";
import { getUserBooks, updateEmail } from "../../store/actions/actionCreators";

const Profile = () => {
    const user = useSelector((state) => state.auth.user);
    const books = useSelector((state) => state.books.userBooks);
    const [email, setEmail] = useState(user.email);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserBooks(user.token));
    }, []);

    const handleEmailTextChange = (e) => {
        setEmail(e.target.value);
    };

    const handleEmailUpdate = () => {
        dispatch(updateEmail(email, user));
    };

    return (
        <div className="main-container">
            <div className="email">
                <h3>Email</h3>
                {user && <p>{user.email}</p>}
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={handleEmailTextChange}
                />
                <button onClick={handleEmailUpdate}>Update Email</button>
            </div>
            <h1>My Books</h1>
            <BookItems user={user} books={books} />
        </div>
    );
};

export default Profile;
