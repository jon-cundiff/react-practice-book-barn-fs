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

    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
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
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </div>
    );
};

export default App;
