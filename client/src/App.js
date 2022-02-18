import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AddBookPage from "./Components/Books/AddBookPage";
import BookDetailsPage from "./Components/Books/BookDetailsPage";
import UpdateBookPage from "./Components/Books/UpdateBookPage";
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import Profile from "./Components/Home/Profile";
import Login from "./Components/Login/Login";
import Signup from "./Components/Login/Signup";

const App = () => {
    const [user, setUser] = useState(null);

    const handleLogout = () => {
        setUser(null);
    };

    const handleLogin = (user) => {
        setUser(user);
    };

    return (
        <div className="App">
            <Header user={user} logout={handleLogout} />
            <Routes>
                <Route path="/" element={<Home user={user} />} />
                <Route
                    path="/add-book"
                    element={<AddBookPage user={user} logout={handleLogout} />}
                />
                <Route
                    path="/profile"
                    element={<Profile user={user} logout={handleLogout} />}
                />
                <Route
                    path="/book/:bookId"
                    element={<BookDetailsPage user={user} />}
                />
                <Route
                    path="/book/:bookId/update"
                    element={
                        <UpdateBookPage user={user} logout={handleLogout} />
                    }
                />
                <Route
                    path="/login"
                    element={<Login user={user} login={handleLogin} />}
                />
                <Route
                    path="/signup"
                    element={<Signup user={user} login={handleLogin} />}
                />
            </Routes>
        </div>
    );
};

export default App;
